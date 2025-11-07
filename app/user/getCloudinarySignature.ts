"use server";

import crypto from "crypto";

export async function getCloudinarySignature(folder: string) {
  const timestamp = Math.round(Date.now() / 1000);

  const signatureString = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

  const signature = crypto
    .createHash("sha1")
    .update(signatureString)
    .digest("hex");

  return { signature, timestamp };
}
