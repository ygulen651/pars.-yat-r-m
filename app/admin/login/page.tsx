import { loginAdmin } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-4">
      <form action={loginAdmin} className="w-full rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Admin Girişi</h1>
        {params.error ? (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {params.error === "config"
              ? "ADMIN_PASSWORD ve ADMIN_SESSION_SECRET ayarlanmalı."
              : "Şifre hatalı."}
          </p>
        ) : null}
        <label className="mt-5 block text-sm font-semibold" htmlFor="password">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-2 w-full rounded-md border border-ink/15 px-3 py-2 outline-none focus:border-field"
        />
        <button className="mt-5 w-full rounded-md bg-field px-4 py-2 font-semibold text-white">
          Giriş yap
        </button>
      </form>
    </main>
  );
}
