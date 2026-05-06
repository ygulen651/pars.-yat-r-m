"use client";

import { categories, type Listing } from "@/lib/types";
import { MultiImageUpload } from "./MultiImageUpload";

export function AdminListingForm({
  action,
  listing,
}: {
  action: (formData: FormData) => void;
  listing?: Listing;
}) {
  return (
    <form 
      action={action} 
      className="grid gap-10 rounded-lg border border-ink/10 bg-white p-8 md:p-12 shadow-sm"
    >
      {/* SECTION: BASIC INFO */}
      <div className="grid gap-6">
        <h2 className="label-xs" style={{ color: "var(--gold)" }}>Temel Bilgiler</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">İlan Başlığı</span>
            <input
              name="title"
              required
              defaultValue={listing?.title}
              placeholder="Örn: Karaman Merkezde Satılık Tarla"
              className="admin-input"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Konum</span>
            <input
              name="location"
              required
              defaultValue={listing?.location}
              placeholder="Örn: Beyazkent Mah. Karaman"
              className="admin-input"
            />
          </label>
        </div>
      </div>

      {/* SECTION: CATEGORY & PRICE */}
      <div className="grid gap-6">
        <h2 className="label-xs" style={{ color: "var(--gold)" }}>Fiyat ve Kategori</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Fiyat (TL)</span>
            <input
              name="price"
              type="number"
              min="0"
              required
              defaultValue={listing?.price}
              className="admin-input"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Kategori</span>
            <select
              name="category"
              defaultValue={listing?.category || "konut"}
              className="admin-input appearance-none bg-[right_1rem_center]"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, 
                backgroundSize: "1rem",
                backgroundRepeat: "no-repeat"
              }}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* SECTION: MAP & VIDEO */}
      <div className="grid gap-6">
        <h2 className="label-xs" style={{ color: "var(--gold)" }}>Medya Bağlantıları</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Google Maps Linki</span>
            <input
              name="map_url"
              type="url"
              defaultValue={listing?.map_url || ""}
              placeholder="https://maps.google.com/..."
              className="admin-input"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Video Linki (YouTube)</span>
            <input
              name="video_url"
              type="url"
              defaultValue={listing?.video_url || ""}
              placeholder="https://www.youtube.com/watch?v=..."
              className="admin-input"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Veya Video Yükle (MP4)</span>
            <input
              name="video_file"
              type="file"
              accept="video/*"
              className="admin-input py-2"
            />
          </label>
        </div>
      </div>

      {/* SECTION: DESCRIPTION */}
      <div className="grid gap-6">
        <h2 className="label-xs" style={{ color: "var(--gold)" }}>Açıklama</h2>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">İlan Detayları</span>
          <textarea
            name="description"
            required
            rows={8}
            defaultValue={listing?.description}
            placeholder="İlan ile ilgili detaylı bilgi giriniz..."
            className="admin-input resize-none"
          />
        </label>
      </div>

      {/* SECTION: PHOTOS */}
      <div className="grid gap-6">
        <h2 className="label-xs" style={{ color: "var(--gold)" }}>Fotoğraflar (En fazla 10 adet)</h2>
        <MultiImageUpload initialImages={listing?.images} />
        <p className="text-xs text-ink/40">
          Not: Birden fazla resim seçmek için <b>CTRL/CMD</b> tuşuna basılı tutun.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div 
        className="flex items-center justify-end gap-4 pt-10 border-t"
        style={{ borderColor: "rgba(28,23,18,0.06)" }}
      >
        <button 
          type="button" 
          onClick={() => window.history.back()}
          className="btn-ghost"
        >
          Vazgeç
        </button>
        <button 
          type="submit" 
          className="btn-primary"
          style={{ 
            background: "var(--ink)", 
            color: "#fff", 
            padding: "1rem 3rem",
            fontSize: "0.85rem"
          }}
        >
          {listing ? "Değişiklikleri Kaydet" : "İlanı Yayınla"}
        </button>
      </div>

    </form>
  );
}
