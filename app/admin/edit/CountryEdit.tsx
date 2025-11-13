"use client";

import { useState } from "react";
import { update_country } from "./action";
import { Country } from "@prisma/client";
import Link from "next/link";

// Props componentă
interface CountryEditProps {
  country: Country;
}

async function edit_country(
  updated: Country
): Promise<{ success: boolean; message?: string }> {
  try {
    await update_country(updated);
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

export default function CountryEdit({ country }: CountryEditProps) {
  const [name, setName] = useState(country.name);
  const [description, setDescription] = useState(country.description ?? "");
  const [seo, setSeo] = useState(country.seo ?? "");
  const [latitude, setLatitude] = useState(country.latitude ?? null);
  const [longitude, setLongitude] = useState(country.longitude ?? null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const updatedCountry: Country = {
      id: country.id,
      name,
      description,
      seo,
      latitude,
      longitude,
    };

    const res = await edit_country(updatedCountry);
    if (res.success) setMessage("Country updated successfully!");
    else setMessage(res.message || "Failed to update country.");
    setLoading(false);
  };

  const rowClass = "flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full";

  return (
    <div className="w-full p-6 bg-white min-h-screen space-y-5">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">Edit Country</h2>
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 underline hover:underline-offset-2 transition-all duration-200"
        >
          Back to admin page
        </Link>
      </div>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* ID */}
        <div className={rowClass}>
          <label className="font-medium w-32">ID</label>
          <input
            type="number"
            value={country.id}
            disabled
            className="flex-1 border p-2 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div className={rowClass}>
          <label className="font-medium w-32">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        {/* Description */}
        <div className={rowClass}>
          <label className="font-medium w-32">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            rows={3}
          />
        </div>

        {/* SEO */}
        <div className={rowClass}>
          <label className="font-medium w-32">SEO</label>
          <textarea
            value={seo}
            onChange={(e) => setSeo(e.target.value)}
            className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            rows={2}
          />
        </div>

        {/* Latitude */}
        <div className={rowClass}>
          <label className="font-medium w-32">Latitude</label>
          <input
            type="number"
            value={latitude ?? ""}
            onChange={(e) =>
              setLatitude(e.target.value ? Number(e.target.value) : null)
            }
            step="any"
            className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Longitude */}
        <div className={rowClass}>
          <label className="font-medium w-32">Longitude</label>
          <input
            type="number"
            value={longitude ?? ""}
            onChange={(e) =>
              setLongitude(e.target.value ? Number(e.target.value) : null)
            }
            step="any"
            className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Save */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
