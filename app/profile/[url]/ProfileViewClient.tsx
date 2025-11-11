"use client";

import React from "react";
import Image from "next/image";
import blankProfile from "@/public/blank-profile.png";
import { CldImage } from "next-cloudinary";

interface ProfileData {
  name: string;
  bdate: string | Date;
  sex: "m" | "f" | null;
  image?: string | null;
  showAge: boolean;
}

interface Props {
  profile: ProfileData;
}

export default function ProfileViewClient({ profile }: Props) {
  const { name, bdate, sex, image, showAge } = profile;

  const calculateAge = (birth: string | Date) => {
    const today = new Date();
    const birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    )
      age--;
    return age;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-fit">
      <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300  shadow-sm">
        {image ? (
          <CldImage
            src={image}
            width={200}
            height={200}
            crop="fill"
            gravity="auto"
            alt="Profile picture"
            quality="auto"
            radius="max"
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        ) : (
          <Image
            src={blankProfile}
            alt="Profile Avatar"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ">
          {name}
        </h1>
        <p className="text-gray-600  text-sm mt-1">
          Age: {showAge ? calculateAge(bdate) : "Is just a number"}
        </p>
        <p className="text-gray-600  text-sm mt-1">
          Sex:{" "}
          {sex === "m" ? "♂ Man" : sex === "f" ? "♀ Woman" : "⚧ Not specified"}
        </p>
      </div>
    </div>
  );
}
