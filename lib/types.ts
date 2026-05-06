export type Category = 
  | "konut" 
  | "tarla" 
  | "fabrika" 
  | "arsa" 
  | "bahce" 
  | "ticari" 
  | "arsa-kiralik" 
  | "enerji-alani";

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
  { value: "konut",         label: "Konut" },
  { value: "tarla",         label: "Tarla" },
  { value: "fabrika",       label: "Fabrika" },
  { value: "arsa",          label: "Arsa" },
  { value: "bahce",         label: "Bahçe" },
  { value: "ticari",        label: "Ticari" },
  { value: "arsa-kiralik",  label: "Arsa Kiralık" },
  { value: "enerji-alani",  label: "Enerji Alanı" },
];
