import { redirect } from "next/navigation";
import { AdminListingForm } from "@/components/AdminListingForm";
import { isAdmin } from "@/lib/auth";
import { createListing } from "../actions";

export default async function NewListingPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-field">Admin Panel</p>
        <h1 className="mt-1 text-3xl font-bold">Yeni İlan</h1>
      </div>
      <AdminListingForm action={createListing} />
    </main>
  );
}
