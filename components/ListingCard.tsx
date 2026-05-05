"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Listing } from "@/lib/types";

const catLabel: Record<string, string> = {
  emlak: "Emlak",
  tarla: "Tarla",
  arsa: "Arsa",
};

export function ListingCard({ listing }: { listing: Listing }) {
  const image = listing.images?.[0]?.url;

  return (
    <Link
      href={`/ilan/${listing.slug}`}
      className="card-void block overflow-hidden"
      style={{ borderRadius: "2px" }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3", background: "var(--void-3)" }}
      >
        {image ? (
          <Image
            src={image}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            style={{ transition: "transform 0.7s var(--ease-out-expo)" }}
          />
        ) : (
          <div
            className="flex h-full flex-col items-center justify-center gap-3"
            style={{
              background:
                "linear-gradient(135deg, var(--void-3) 0%, var(--void-2) 100%)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                color: "rgba(28,23,18,0.12)",
                fontWeight: 300,
              }}
            >
              ◈
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-ghost)",
                opacity: 0.4,
                fontFamily: "var(--font-ui)",
              }}
            >
              Fotoğraf Yok
            </span>
          </div>
        )}

        {/* Category badge */}
        <span
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            fontFamily: "var(--font-ui)",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            background: "rgba(247,244,239,0.88)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(28,23,18,0.1)",
            padding: "0.25rem 0.65rem",
          }}
        >
          {catLabel[listing.category] ?? listing.category}
        </span>

        {/* Photo count */}
        <span
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            background: "rgba(247,244,239,0.85)",
            backdropFilter: "blur(8px)",
            color: "var(--ink-dim)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            padding: "0.2rem 0.55rem",
          }}
        >
          {listing.images?.length || 0} foto
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        {/* Price — Cormorant Garamond */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.7rem",
            fontWeight: 500,
            color: "var(--gold)",
            letterSpacing: "-0.01em",
            marginBottom: "0.75rem",
          }}
        >
          {formatPrice(listing.price)}
        </p>

        {/* Title */}
        <h2
          className="card-title"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--ink)",
            lineHeight: "1.55",
            marginBottom: "0.75rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {listing.title}
        </h2>

        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--ink-ghost)",
            marginBottom: "0.75rem",
          }}
        >
          <svg
            width="11"
            height="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            style={{ flexShrink: 0, color: "var(--gold-deep)", opacity: 0.7 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.72rem",
              letterSpacing: "0.06em",
              textTransform: "capitalize",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {listing.location}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.78rem",
            lineHeight: "1.7",
            color: "var(--ink-ghost)",
            opacity: 0.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {listing.description}
        </p>

        {/* Gold line reveal */}
        <div
          className="card-reveal-line"
          style={{
            marginTop: "1.25rem",
            height: "1px",
            background: "linear-gradient(90deg, var(--gold-deep), transparent)",
            opacity: 0,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>
    </Link>
  );
}
