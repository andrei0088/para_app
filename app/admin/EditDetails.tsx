"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditDetails = () => {
  const [landing, setLanding] = useState<number | "">("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setLanding(value === "" ? "" : Number(value));
  };

  const handleEdit = () => {
    if (landing !== "") {
      router.push(`/admin/details/landing?id=${landing}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-sm">
      <p className="text-gray-700 text-lg mb-4">Edit details for landing:</p>

      <div className="flex justify-center items-center gap-3">
        <input
          type="number"
          value={landing}
          onChange={handleChange}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditDetails;
