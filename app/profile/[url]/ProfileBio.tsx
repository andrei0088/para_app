import React from "react";

interface ProfileBioProps {
  bio?: string | null;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio }) => {
  if (!bio) return null; // nimic dacă nu există bio

  return (
    <div className="text-gray-700 border-t border-gray-200 pt-4 mt-2 md:max-w-1/2">
      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {bio}
      </p>
    </div>
  );
};

export default ProfileBio;
