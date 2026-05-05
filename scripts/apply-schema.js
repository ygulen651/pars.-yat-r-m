const crypto = require("crypto");
const fs = require("fs");
const net = require("net");
const tls = require("tls");

function loadEnv(path) {
  const text = fs.readFileSync(path, "utf8");
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
  return env;
}

function writeCString(parts) {
  return Buffer.from(`${parts.join("\0")}\0\0`);
}

function startupMessage({ user, database }) {
  const params = writeCString([
    "user",
    user,
    "database",
    database,
    "client_encoding",
    "UTF8",
  ]);
  const buffer = Buffer.alloc(8 + params.length);
  buffer.writeInt32BE(buffer.length, 0);
  buffer.writeInt32BE(196608, 4);
  params.copy(buffer, 8);
  return buffer;
}

function saslInitial(clientFirst) {
  const mechanism = Buffer.from("SCRAM-SHA-256\0");
  const first = Buffer.from(clientFirst);
  const buffer = Buffer.alloc(4 + mechanism.length + 4 + first.length);
  buffer.writeInt32BE(buffer.length, 0);
  mechanism.copy(buffer, 4);
  buffer.writeInt32BE(first.length, 4 + mechanism.length);
  first.copy(buffer, 8 + mechanism.length);
  return Buffer.concat([Buffer.from("p"), buffer]);
}

function saslResponse(response) {
  const data = Buffer.from(response);
  const len = Buffer.alloc(4);
  len.writeInt32BE(4 + data.length, 0);
  return Buffer.concat([Buffer.from("p"), len, data]);
}

function simpleQuery(sql) {
  const data = Buffer.from(`${sql}\0`);
  const len = Buffer.alloc(4);
  len.writeInt32BE(4 + data.length, 0);
  return Buffer.concat([Buffer.from("Q"), len, data]);
}

function hmac(key, text) {
  return crypto.createHmac("sha256", key).update(text).digest();
}

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest();
}

function xor(a, b) {
  const out = Buffer.alloc(a.length);
  for (let i = 0; i < a.length; i += 1) out[i] = a[i] ^ b[i];
  return out;
}

function parseAttributes(message) {
  return Object.fromEntries(
    message.split(",").map((part) => {
      const index = part.indexOf("=");
      return [part.slice(0, index), part.slice(index + 1)];
    }),
  );
}

function parseError(payload) {
  const fields = {};
  let offset = 0;
  while (offset < payload.length && payload[offset] !== 0) {
    const code = String.fromCharCode(payload[offset]);
    offset += 1;
    const end = payload.indexOf(0, offset);
    fields[code] = payload.slice(offset, end).toString();
    offset = end + 1;
  }
  return fields.M || "Unknown PostgreSQL error";
}

function readMessages(socket, onMessage) {
  let pending = Buffer.alloc(0);
  socket.on("data", (chunk) => {
    pending = Buffer.concat([pending, chunk]);
    while (pending.length >= 5) {
      const length = pending.readInt32BE(1);
      if (pending.length < 1 + length) break;
      const type = String.fromCharCode(pending[0]);
      const payload = pending.slice(5, 1 + length);
      pending = pending.slice(1 + length);
      onMessage(type, payload);
    }
  });
}

async function connectWithSsl(host, port) {
  return new Promise((resolve, reject) => {
    const raw = net.connect({ host, port });
    raw.setTimeout(10000);
    raw.once("connect", () => {
      const request = Buffer.alloc(8);
      request.writeInt32BE(8, 0);
      request.writeInt32BE(80877103, 4);
      raw.write(request);
    });
    raw.once("data", (response) => {
      if (response.toString() !== "S") {
        reject(new Error("Server did not accept SSL"));
        raw.destroy();
        return;
      }
      const secure = tls.connect({
        socket: raw,
        servername: host,
        rejectUnauthorized: false,
      });
      secure.once("secureConnect", () => resolve(secure));
      secure.once("error", reject);
    });
    raw.once("timeout", () => reject(new Error("Connection timed out")));
    raw.once("error", reject);
  });
}

async function main() {
  const env = loadEnv(".env.local");
  const sql = fs.readFileSync("supabase/schema.sql", "utf8");
  const url = new URL(env.DIRECT_URL);
  const user = decodeURIComponent(url.username);
  const password = decodeURIComponent(url.password);
  const database = url.pathname.replace(/^\//, "") || "postgres";

  const socket = await connectWithSsl(url.hostname, Number(url.port || 5432));
  let clientFirstBare = "";
  let serverFirst = "";
  let querySent = false;

  const done = new Promise((resolve, reject) => {
    socket.once("error", reject);
    readMessages(socket, (type, payload) => {
      if (type === "E") {
        reject(new Error(parseError(payload)));
        socket.end();
        return;
      }
      if (type === "R") {
        const authType = payload.readInt32BE(0);
        if (authType === 0) return;
        if (authType === 10) {
          const nonce = crypto.randomBytes(18).toString("base64");
          clientFirstBare = `n=*,r=${nonce}`;
          socket.write(saslInitial(`n,,${clientFirstBare}`));
          return;
        }
        if (authType === 11) {
          serverFirst = payload.slice(4).toString();
          const attrs = parseAttributes(serverFirst);
          const clientFinalNoProof = `c=biws,r=${attrs.r}`;
          const authMessage = `${clientFirstBare},${serverFirst},${clientFinalNoProof}`;
          const saltedPassword = crypto.pbkdf2Sync(
            password,
            Buffer.from(attrs.s, "base64"),
            Number(attrs.i),
            32,
            "sha256",
          );
          const clientKey = hmac(saltedPassword, "Client Key");
          const storedKey = sha256(clientKey);
          const clientSignature = hmac(storedKey, authMessage);
          const proof = xor(clientKey, clientSignature).toString("base64");
          socket.write(saslResponse(`${clientFinalNoProof},p=${proof}`));
          return;
        }
        if (authType === 12) return;
        reject(new Error(`Unsupported auth type ${authType}`));
      }
      if (type === "Z") {
        if (!querySent) {
          querySent = true;
          socket.write(simpleQuery(sql));
          return;
        }
        resolve();
        socket.end();
      }
    });
  });

  socket.write(startupMessage({ user, database }));
  await done;
  console.log("Schema applied successfully");
}

main().catch((error) => {
  console.error(`Schema failed: ${error.message}`);
  process.exit(1);
});
