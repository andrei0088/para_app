"use client";
import { CldImage } from "next-cloudinary";
import blankPhoto from "@/public/blank-profile.png";
import Image from "next/image";

type Imag = {
  image: string | null;
};

const ViewAvatar = ({ image }: Imag) => {
  return (
    <div className="w-full my-2">
      {image ? (
        <CldImage
          src={image}
          width={50}
          height={50}
          crop="fill"
          gravity="auto"
          alt="Profile picture"
          quality="auto"
          radius="max"
          style={{ objectFit: "cover", cursor: "pointer" }}
        />
      ) : (
        <Image
          src={blankPhoto}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition-transform duration-200"
        />
      )}
    </div>
  );
};

export default ViewAvatar;
