import { deleteListing } from "@/app/admin/actions";

export function DeleteListingButton({ id }: { id: string }) {
  const action = deleteListing.bind(null, id);

  return (
    <form action={action}>
      <button className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700">
        Sil
      </button>
    </form>
  );
}
