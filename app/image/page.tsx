"use client";
import { CldImage } from 'next-cloudinary';

export default function PublicImage() {
  return (
    <CldImage
      src="map1_hqu2vm" // ex: "map1"
      width={500}
      height={500}
      alt="Imagine publică"
    />
  );
}



 