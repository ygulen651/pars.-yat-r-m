export type Category = "emlak" | "tarla" | "arsa";

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  location: string;
  map_url: string | null;
  slug: string;
  created_at: string;
  video_url: string | null;
  images?: ListingImage[];
};

export type ListingImage = {
  id: string;
  listing_id: string;
  url: string;
};

export const categories: { value: Category; label: string }[] = [
  { value: "emlak", label: "Emlak" },
  { value: "tarla", label: "Tarla" },
  { value: "arsa", label: "Arsa" },
];
