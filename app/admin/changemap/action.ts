"use server";

import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  // ... restul nu sunt necesare pentru DB
}

// Dacă încă primești URL, păstrezi funcția.
function extractPublicId(url: string): string | null {
  if (!url) return null;
  const parts = url.split("/");
  const filename = parts.pop();
  const folder = parts.pop();
  if (!filename || !folder) return null;
  return `${folder}/${filename.split(".")[0]}`;
}

export async function uploadNewMap(formData: FormData) {
  const file = formData.get("mapFile") as File | null;
  const id = Number(formData.get("id"));
  const type = formData.get("type") as string;
  const oldValue = formData.get("oldUrl") as string; // poate fi URL sau public_id

  if (!file) return { success: false, error: "No file received" };

  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload Cloudinary
  const uploaded: CloudinaryUploadResult = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "maps" }, (err, result) =>
          err ? reject(err) : resolve(result as CloudinaryUploadResult)
        )
        .end(buffer);
    }
  );

  // Ștergere veche imagine
  if (oldValue) {
    // Dacă în DB ai deja public_id, poți folosi direct:
    // await cloudinary.uploader.destroy(oldValue);

    // Dacă încă trimiți URL din formulare:
    const publicId = extractPublicId(oldValue) ?? oldValue;
    await cloudinary.uploader.destroy(publicId);
  }

  // Actualizare DB cu public_id
  const newPublicId = uploaded.public_id;

  switch (type) {
    case "c":
      await prisma.country.update({
        where: { id },
        data: { image: newPublicId },
      });
      break;

    case "r":
      await prisma.region.update({
        where: { id },
        data: { map: newPublicId },
      });
      break;

    case "t":
      await prisma.takeoff.update({
        where: { id },
        data: { map: newPublicId },
      });
      break;

    case "l":
      await prisma.landing.update({
        where: { id },
        data: { map: newPublicId },
      });
      break;

    default:
      throw new Error("Invalid type for updating map");
  }

  return { success: true, public_id: newPublicId };
}
