import Link from "next/link";

export function Pagination({
  page,
  pageSize,
  count,
  basePath,
}: {
  page: number;
  pageSize: number;
  count: number;
  basePath: string;
}) {
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  if (totalPages <= 1) return null;
  const pageHref = (nextPage: number) =>
    `${basePath}${basePath.includes("?") ? "&" : "?"}page=${nextPage}`;

  return (
    <nav
      className="mt-16 flex items-center justify-center gap-6"
      style={{ borderTop: "1px solid rgba(245,240,232,0.05)", paddingTop: "3rem" }}
    >
      {page > 1 ? (
        <Link
          href={pageHref(page - 1)}
          className="btn-ghost flex items-center gap-3"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Önceki
        </Link>
      ) : null}

      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          color: "var(--ink-dim)",
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ color: "var(--gold)" }}>{page}</span>
        <span style={{ margin: "0 0.5rem", opacity: 0.3 }}>/</span>
        <span style={{ opacity: 0.4 }}>{totalPages}</span>
      </div>

      {page < totalPages ? (
        <Link
          href={pageHref(page + 1)}
          className="btn-ghost flex items-center gap-3"
        >
          Sonraki
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : null}
    </nav>
  );
}
