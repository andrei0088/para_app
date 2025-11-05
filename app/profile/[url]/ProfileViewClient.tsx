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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 max-w-4xl w-full mx-auto transition-colors duration-300">
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
    <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 shadow-sm">
      <Image
        src={image || blankProfile}
        alt="Profile Avatar"
        fill
        className="object-cover"
      />
    </div>
    <div className="text-center sm:text-left">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Age: {calculateAge(bdate)}</p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        Sex: {sex === "m" ? "♂ Man" : sex === "f" ? "♀ Woman" : "⚧ Not specified"}
      </p>
    </div>
  </div>

  {bio && (
    <div className="text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
      <p className="text-sm sm:text-base leading-relaxed">{bio}</p>
    </div>
  )}
</div>

  );
}
