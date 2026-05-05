import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteListingButton } from "@/components/DeleteListingButton";
import { formatDate, formatPrice } from "@/lib/format";
import { isAdmin } from "@/lib/auth";
import { getListings } from "@/lib/listings";
import { logoutAdmin } from "./actions";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const { listings } = await getListings(1);

  return (
    <main 
      style={{ background: "var(--void)", minHeight: "100vh" }}
      className="py-12 md:py-20"
    >
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
        
        {/* HEADER */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b pb-12" style={{ borderColor: "rgba(28,23,18,0.06)" }}>
          <div>
            <p className="label-xs" style={{ marginBottom: "1rem" }}>Yönetim Paneli</p>
            <h1 className="display-lg">İlan Yönetimi</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/new" 
              className="btn-primary"
              style={{ background: "var(--ink)", color: "#fff", padding: "0.75rem 2rem" }}
            >
              + Yeni İlan Ekle
            </Link>
            <form action={logoutAdmin}>
              <button 
                className="btn-ghost"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Oturumu Kapat
              </button>
            </form>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div 
          className="overflow-hidden bg-white shadow-sm"
          style={{ border: "1px solid rgba(28,23,18,0.06)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr style={{ background: "var(--void-2)", borderBottom: "1px solid rgba(28,23,18,0.08)" }}>
                  <th className="px-6 py-5 label-xs" style={{ color: "var(--ink-ghost)" }}>İlan Detayı</th>
                  <th className="px-6 py-5 label-xs" style={{ color: "var(--ink-ghost)" }}>Kategori</th>
                  <th className="px-6 py-5 label-xs" style={{ color: "var(--ink-ghost)" }}>Konum</th>
                  <th className="px-6 py-5 label-xs" style={{ color: "var(--ink-ghost)" }}>Fiyat</th>
                  <th className="px-6 py-5 label-xs" style={{ color: "var(--ink-ghost)" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr 
                    key={listing.id} 
                    className="group hover:bg-void-2/30 transition-colors"
                    style={{ borderBottom: "1px solid rgba(28,23,18,0.04)" }}
                  >
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span style={{ fontFamily: "var(--font-ui)", fontWeight: 600, color: "var(--ink)" }}>
                          {listing.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-ink-ghost">
                          {formatDate(listing.created_at)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="label-xs" style={{ color: "var(--gold-deep)" }}>{listing.category}</span>
                    </td>
                    <td className="px-6 py-6">
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--ink-dim)" }}>
                        {listing.location}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--ink)" }}>
                        {formatPrice(listing.price)}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/${listing.id}`}
                          className="btn-ghost"
                          style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}
                        >
                          Düzenle
                        </Link>
                        <DeleteListingButton id={listing.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {listings.length === 0 && (
            <div className="py-20 text-center">
              <p className="display-md" style={{ opacity: 0.1, marginBottom: "1rem" }}>∅</p>
              <p className="label-xs" style={{ opacity: 0.4 }}>Henüz yayınlanmış bir ilan bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
