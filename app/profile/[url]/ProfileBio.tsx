import React from "react";

interface ProfileBioProps {
  bio?: string | null;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio }) => {
  if (!bio) return null; // nimic dacă nu există bio

  return (
    <div className="text-gray-700 pt-2 md:max-w-1/2">
      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {bio}
      </p>
      <div className="w-full h-0.5 bg-linear-to-r from-gray-300 via-cyan-500 to-gray-300  rounded-full"></div>
    </div>
  );
};

export default ProfileBio;
