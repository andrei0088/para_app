"use server";

import { prisma } from "@/app/api/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Tip pentru rezultatul Cloudinary
interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  etag: string;
  folder?: string;
}

// Funcție utilitară pentru extragerea public_id din URL
function extractPublicId(url: string): string | null {
  if (!url) return null;
  const parts = url.split("/");
  const filename = parts.pop();
  const folder = parts.pop();
  if (!filename || !folder) return null;
  return `${folder}/${filename.split(".")[0]}`;
}

// Funcție principală de upload și update DB
export async function uploadNewMap(formData: FormData) {
  const file = formData.get("mapFile") as File | null;
  const id = Number(formData.get("id"));
  const type = formData.get("type") as string;
  const oldUrl = formData.get("oldUrl") as string;

  if (!file) return { success: false, error: "No file received" };

  // Convertim fișierul în buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload pe Cloudinary
  const uploaded: CloudinaryUploadResult = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "maps" }, (err, result) =>
          err ? reject(err) : resolve(result as CloudinaryUploadResult)
        )
        .end(buffer);
    }
  );

  // Ștergere veche (dacă există)
  if (oldUrl) {
    const publicId = extractPublicId(oldUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }

  // Update DB în funcție de tip
  switch (type) {
    case "c":
      await prisma.country.update({
        where: { id },
        data: { image: uploaded.secure_url },
      });
      break;
    case "r":
      await prisma.region.update({
        where: { id },
        data: { map: uploaded.secure_url },
      });
      break;
    case "t":
      await prisma.takeoff.update({
        where: { id },
        data: { map: uploaded.secure_url },
      });
      break;
    case "l":
      await prisma.landing.update({
        where: { id },
        data: { map: uploaded.secure_url },
      });
      break;
    default:
      throw new Error("Invalid type for updating map");
  }

  return { success: true, url: uploaded.secure_url };
}
