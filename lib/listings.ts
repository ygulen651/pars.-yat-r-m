import { supabase } from "@/lib/supabase";
import type { Category, Listing } from "@/lib/types";

const pageSize = 12;

export async function getListings(page = 1, category?: Category, search?: string) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("listings")
    .select("*, images(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq("category", category);
  }

  if (search) {
    const value = search.replaceAll("%", "").replaceAll(",", " ").trim();
    if (value) {
      query = query.or(
        `title.ilike.%${value}%,location.ilike.%${value}%,description.ilike.%${value}%`,
      );
    }
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    listings: (data || []) as Listing[],
    count: count || 0,
    pageSize,
  };
}

export async function getListingBySlug(slug: string) {
  const { data, error } = await supabase
    .from("listings")
    .select("*, images(*)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Listing;
}

export async function getLatestListings(limit = 6) {
  const { data, error } = await supabase
    .from("listings")
    .select("*, images(*)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []) as Listing[];
}
