"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { clearAdminSession, isAdmin } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { slugify } from "@/lib/slug";
import type { Category } from "@/lib/types";

const imageBucket = "listing-images";

async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

function imageFilesFromForm(formData: FormData) {
  return formData
    .getAll("photos")
    .filter((value): value is File => value instanceof File && value.size > 0);
}

function fileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension && /^[a-z0-9]+$/.test(extension)) return extension;
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

function storagePathFromPublicUrl(url: string) {
  const marker = `/storage/v1/object/public/${imageBucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

async function uploadVideo(listingId: string, file: File) {
  const supabase = createAdminSupabaseClient();
  if (!file.type.startsWith("video/")) return null;

  const path = `${listingId}/video-${Date.now()}-${randomUUID()}.${fileExtension(file)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(imageBucket).upload(path, buffer, {
    contentType: file.type || "video/mp4",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(imageBucket).getPublicUrl(path);
  return data.publicUrl;
}

async function replaceListingVideo(listingId: string, file: File | null) {
  if (!file) return;
  const url = await uploadVideo(listingId, file);
  if (url) {
    const supabase = createAdminSupabaseClient();
    const { error } = await supabase
      .from("listings")
      .update({ video_url: url })
      .eq("id", listingId);
    if (error) throw error;
  }
}

async function uploadImages(listingId: string, files: File[]) {
  const supabase = createAdminSupabaseClient();
  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;

    const path = `${listingId}/${Date.now()}-${randomUUID()}.${fileExtension(file)}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from(imageBucket).upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(imageBucket).getPublicUrl(path);
    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}

async function replaceListingImages(listingId: string, files: File[]) {
  const supabase = createAdminSupabaseClient();

  const { data: oldImages, error: oldImagesError } = await supabase
    .from("images")
    .select("url")
    .eq("listing_id", listingId);

  if (oldImagesError) throw oldImagesError;

  const oldPaths = (oldImages || [])
    .map((image) => storagePathFromPublicUrl(image.url))
    .filter((path): path is string => Boolean(path));

  if (oldPaths.length > 0) {
    await supabase.storage.from(imageBucket).remove(oldPaths);
  }

  const { error: deleteError } = await supabase.from("images").delete().eq("listing_id", listingId);
  if (deleteError) throw deleteError;

  const urls = await uploadImages(listingId, files);
  if (urls.length > 0) {
    const { error: imageError } = await supabase.from("images").insert(
      urls.map((url) => ({
        listing_id: listingId,
        url,
      })),
    );
    if (imageError) throw imageError;
  }
}

async function createUniqueSlug(baseText: string, currentListingId?: string) {
  const supabase = createAdminSupabaseClient();
  const baseSlug = slugify(baseText) || `ilan-${Date.now()}`;
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    let query = supabase.from("listings").select("id").eq("slug", slug);
    if (currentListingId) {
      query = query.neq("id", currentListingId);
    }

    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    if (!data) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export async function createListing(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();

  const title = String(formData.get("title") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const category = String(formData.get("category") || "konut") as Category;
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);
  const mapUrl = String(formData.get("map_url") || "").trim() || null;
  const videoUrl = String(formData.get("video_url") || "").trim() || null;
  const slug = await createUniqueSlug(`${location}-${title}`);

  const { data, error } = await supabase
    .from("listings")
    .insert({ title, location, category, description, price, map_url: mapUrl, video_url: videoUrl, slug })
    .select("id")
    .single();

  if (error) throw error;

  const videoFile = formData.get("video_file") as File | null;
  if (videoFile && videoFile.size > 0) {
    await replaceListingVideo(data.id, videoFile);
  }

  await replaceListingImages(data.id, imageFilesFromForm(formData));

  redirect("/admin");
}

export async function updateListing(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();

  const title = String(formData.get("title") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const category = String(formData.get("category") || "konut") as Category;
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);
  const mapUrl = String(formData.get("map_url") || "").trim() || null;
  const videoUrl = String(formData.get("video_url") || "").trim() || null;
  const slug = await createUniqueSlug(`${location}-${title}`, id);

  const { error } = await supabase
    .from("listings")
    .update({ title, location, category, description, price, map_url: mapUrl, video_url: videoUrl, slug })
    .eq("id", id);

  if (error) throw error;

  const videoFile = formData.get("video_file") as File | null;
  if (videoFile && videoFile.size > 0) {
    await replaceListingVideo(id, videoFile);
  }

  const files = imageFilesFromForm(formData);
  if (files.length > 0) {
    await replaceListingImages(id, files);
  }

  redirect("/admin");
}

export async function deleteListing(id: string) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();

  const { data: images } = await supabase.from("images").select("url").eq("listing_id", id);
  const paths = (images || [])
    .map((image) => storagePathFromPublicUrl(image.url))
    .filter((path): path is string => Boolean(path));

  if (paths.length > 0) {
    await supabase.storage.from(imageBucket).remove(paths);
  }

  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) throw error;

  redirect("/admin");
}
