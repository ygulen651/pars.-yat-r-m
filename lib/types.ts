export type Category = 
  | "konut" 
  | "tarla" 
  | "fabrika" 
  | "arsa" 
  | "bahce" 
  | "ticari-arsa" 
  | "enerji-tahsis-alani";

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
  { value: "fabrika",             label: "Fabrika" },
  { value: "ticari-arsa",         label: "Ticari Arsa" },
  { value: "enerji-tahsis-alani", label: "Enerji Tahsis Alanı" },
  { value: "bahce",               label: "Bahçe" },
  { value: "tarla",               label: "Tarla" },
  { value: "konut",               label: "Konut" },
  { value: "arsa",                label: "Arsa" },
];
