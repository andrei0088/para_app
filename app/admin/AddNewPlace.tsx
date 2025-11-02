"use client";

import { useState } from "react";
import { addPlace } from "@/app/api/actions/update_places";

type Country = { id: number; name: string };
type Region = { id: number; name: string; countryId: number };

interface AddPlaceUserProps {
  countries: Country[];
  regions: Region[];
}

export default function AddPlaceUser({ countries, regions }: AddPlaceUserProps) {
  const [type, setType] = useState("");
  const [countryId, setCountryId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type) return alert("Select a type");

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawName = formData.get("name") as string;
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1); // capitalize first letter

    const latitude = type === "takeoff" || type === "landing" ? Number(formData.get("latitude")) : undefined;
    const longitude = type === "takeoff" || type === "landing" ? Number(formData.get("longitude")) : undefined;
    const altitude = type === "takeoff" || type === "landing" ? Number(formData.get("altitude")) : undefined;

    const rez = await addPlace(type, name, countryId!, regionId!, latitude, longitude, altitude);

    if (rez.success) {
      window.location.href = `/admin/editplace?type=${type}&id=${rez.id}`;
    } else {
      alert("❌ Error: " + rez.message);
    }

    setLoading(false);
  };

  const filteredRegions = countryId ? regions.filter(r => r.countryId === countryId) : regions;

  return (
    <div className="w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Place</h2>

      <form onSubmit={handleCreate} className="space-y-4">
        {/* Type */}
        <div>
          <label className="block font-medium mb-1">Type:</label>
          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setCountryId(null); setRegionId(null); }}
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select type</option>
            <option value="country">Country</option>
            <option value="region">Region</option>
            <option value="takeoff">Takeoff</option>
            <option value="landing">Landing</option>
          </select>
        </div>

        {/* Country */}
        {(type === "region" || type === "takeoff" || type === "landing") && (
          <div>
            <label className="block font-medium mb-1">Country:</label>
            <select
              value={countryId ?? ""}
              onChange={(e) => setCountryId(Number(e.target.value))}
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select country</option>
              {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        )}

        {/* Region */}
        {(type === "takeoff" || type === "landing") && countryId && (
          <div>
            <label className="block font-medium mb-1">Region:</label>
            <select
              value={regionId ?? ""}
              onChange={(e) => setRegionId(Number(e.target.value))}
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select region</option>
              {filteredRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
       

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
