import React from "react";
import Link from "next/link";

interface GeneralDataProps {
  isPublic: boolean;
  url: string;
}

const GeneralData: React.FC<GeneralDataProps> = ({ isPublic, url }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 w-full">
      <h1 className="text-3xl font-bold text-gray-900 ">Edit Profile</h1>

      {isPublic ? (
        <Link
          href={`/profile/${url}`}
          className="text-green-600 hover:text-green-700 font-medium underline"
        >
          View Profile
        </Link>
      ) : (
        <span className="text-gray-500 text-sm italic">
          Make your profile public to view it.
        </span>
      )}
    </div>
  );
};

export default GeneralData;
