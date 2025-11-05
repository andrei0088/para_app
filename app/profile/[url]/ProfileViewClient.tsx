"use client";

import React from "react";
import Image from "next/image"; // trebuie să fie în client
import blankProfile from "@/public/blank-profile.png";

interface ProfileData {
  name: string;
  bdate: string | Date;
  sex: "m" | "f" | null;
  bio: string | null;
  image?: string | null;
  videos?: string[];
}

interface Props {
  profile: ProfileData;
}

export default function ProfileViewClient({ profile }: Props) {
  const { name, bdate, sex, bio, image } = profile;

  const calculateAge = (birth: string | Date) => {
    const today = new Date();
    const birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={image || blankProfile}
            alt="Profile Avatar"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600 text-sm">Age: {calculateAge(bdate)}</p>
          <p className="text-gray-600 text-sm">
            Sex: {sex === "m" ? "♂ Man" : sex === "f" ? "♀ Woman" : "⚧ Not specified"}
          </p>
        </div>
      </div>

      {bio && (
        <div className="text-gray-700 border-t pt-4 mt-2">
          <p>{bio}</p>
        </div>
      )}

    </div>
  );
}
