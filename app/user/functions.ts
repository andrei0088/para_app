"use server";

import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format?: string;
  width?: number;
  height?: number;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function add_picture(
  fileBuffer: ArrayBuffer | Buffer,
  filename: string,
  currentImage?: string
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { success: false, message: "User not logged in" };

  // Convertim corect la Node.js Buffer dacă e ArrayBuffer
  let nodeBuffer: Buffer;
  if (fileBuffer instanceof ArrayBuffer) {
    nodeBuffer = Buffer.from(new Uint8Array(fileBuffer));
  } else {
    nodeBuffer = fileBuffer;
  }

  // Upload la Cloudinary
  const result: CloudinaryUploadResult = await new Promise(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "profile_pic", public_id: filename },
        (err, res) => {
          if (err) return reject(err);
          resolve(res as CloudinaryUploadResult);
        }
      );

      uploadStream.end(nodeBuffer);
    }
  );

  // Șterge imaginea veche dacă există
  if (currentImage) {
    try {
      await cloudinary.uploader.destroy(currentImage);
    } catch (err) {
      console.warn("Nu s-a putut șterge imaginea veche:", err);
    }
  }

  // Salvează în DB
  await prisma.profile.update({
    where: { userId: session.user.id },
    data: { image: result.public_id },
  });
  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: result.public_id },
  });

  return { success: true, publicId: result.public_id, url: result.secure_url };
}

export async function delete_picture() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { success: false, message: "User not logged in" };

  // Obține imaginea curentă
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile?.image)
    return { success: false, message: "No profile picture to delete" };

  // Șterge din Cloudinary
  try {
    await cloudinary.uploader.destroy(profile.image);
  } catch (err) {
    console.warn("Nu s-a putut șterge imaginea din Cloudinary:", err);
  }

  // Șterge din DB
  await prisma.profile.update({
    where: { userId: session.user.id },
    data: { image: null },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: null },
  });

  return { success: true, message: "Profile picture deleted" };
}
