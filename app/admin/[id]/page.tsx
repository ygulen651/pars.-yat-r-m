import { redirect } from "next/navigation";
import { AdminListingForm } from "@/components/AdminListingForm";
import { isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Listing } from "@/lib/types";
import { updateListing } from "../actions";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { id } = await params;
  const { data, error } = await supabase
    .from("listings")
    .select("*, images(*)")
    .eq("id", id)
    .single();

  if (error || !data) redirect("/admin");

  const action = updateListing.bind(null, id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-field">Admin Panel</p>
        <h1 className="mt-1 text-3xl font-bold">İlan Düzenle</h1>
      </div>
      <AdminListingForm action={action} listing={data as Listing} />
    </main>
  );
}
