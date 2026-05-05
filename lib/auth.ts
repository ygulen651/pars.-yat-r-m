import { cookies } from "next/headers";

const cookieName = "pars_admin";

export async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value === process.env.ADMIN_SESSION_SECRET;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, process.env.ADMIN_SESSION_SECRET || "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
