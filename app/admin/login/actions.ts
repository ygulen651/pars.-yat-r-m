"use server";

import { redirect } from "next/navigation";
import { setAdminSession } from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    redirect("/admin/login?error=config");
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession();
  redirect("/admin");
}
