"use client";

import { Region } from "@prisma/client";
import { useState } from "react";
import { update_region } from "./action";
import Link from "next/link";

interface CountryOption {
  id: number;
  name: string;
}

interface RegionEditProps {
  region: Region;
  countries: CountryOption[];
}

// Funcția de update
async function edit_region(
  updated: Region
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await update_region(updated);
    return {
      success: res.success === true,
      message: typeof res.message === "string" ? res.message : undefined,
    };
  } catch (err) {
    return {
      success: false,
      message: String(err) || "Unknown error",
    };
  }
}

export default function RegionEdit({ region, countries }: RegionEditProps) {
  const [name, setName] = useState(region.name);
  const [countryId, setCountryId] = useState(region.countryId);
  const [description, setDescription] = useState(region.description ?? "");
  const [seo, setSeo] = useState(region.seo ?? "");
  const [latitude, setLatitude] = useState<number | null>(
    region.latitude ?? null
  );
  const [longitude, setLongitude] = useState<number | null>(
    region.longitude ?? null
  );
  const [map, setMap] = useState(region.map ?? "");
  const [bestSeason, setBestSeason] = useState<number[]>(
    region.bestSeason ?? []
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSeasonChange = (month: number) => {
    setBestSeason((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const updatedRegion: Region = {
      ...region,
      name,
      countryId,
      description,
      seo,
      latitude,
      longitude,
      map,
      bestSeason,
    };

    const res = await edit_region(updatedRegion);

    // ✅ Garantăm că mesajul este string
    setMessage(
      res.message ??
        (res.success
          ? "Region updated successfully!"
          : "Failed to update region.")
    );
    setLoading(false);
  };

  const rowClass = "flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full";

  return (
    <div className="w-full p-6 bg-white min-h-screen space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Region</h2>
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
            value={region.id}
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

        {/* Country select */}
        <div className={rowClass}>
          <label className="font-medium w-32">Country</label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(Number(e.target.value))}
            className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Best Season (checkboxes) */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 w-full">
          <label className="font-medium w-32">Best Season (Months)</label>
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <label key={month} className="flex items-center gap-1 w-12">
                <input
                  type="checkbox"
                  checked={bestSeason.includes(month)}
                  onChange={() => handleSeasonChange(month)}
                  className="accent-cyan-500"
                />
                {month}
              </label>
            ))}
          </div>
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

        {/* Map */}
        <div className={rowClass}>
          <label className="font-medium w-32">Map</label>
          <input
            type="text"
            value={map}
            onChange={(e) => setMap(e.target.value)}
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
