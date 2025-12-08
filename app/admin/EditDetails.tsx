"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditDetails = () => {
  const [id, setId] = useState<number | "">("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setId(value === "" ? "" : Number(value));
  };

  const handleCountryEdit = () => {
    if (id !== "") {
      router.push(`/admin/details/country?id=${id}`);
    }
  };
  const handleRegionEdit = () => {
    if (id !== "") {
      router.push(`/admin/details/region?id=${id}`);
    }
  };
  const handleTakeoffEdit = () => {
    if (id !== "") {
      router.push(`/admin/details/takeoff?id=${id}`);
    }
  };
  const handleLandingEdit = () => {
    if (id !== "") {
      router.push(`/admin/details/landing?id=${id}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-sm">
      <p className="text-gray-700 text-lg mb-4">Edit details for id :</p>

      <div className="flex justify-center items-center gap-3">
        <input
          type="number"
          value={id}
          onChange={handleChange}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleCountryEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit Country
        </button>
        <button
          onClick={handleRegionEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit Region
        </button>
        <button
          onClick={handleTakeoffEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit Takeoff
        </button>
        <button
          onClick={handleLandingEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit Landing
        </button>
      </div>
    </div>
  );
};

export default EditDetails;
