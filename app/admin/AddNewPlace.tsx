"use client";

import { useState } from "react";
import { addPlace } from "@/app/api/actions/update_places";
import type { PlaceType } from "@/app/types";

type Country = { id: number; name: string };
type Region = { id: number; name: string; countryId: number };

interface AddPlaceUserProps {
  countries: Country[];
  regions: Region[];
}

export default function AddPlaceUser({ countries, regions }: AddPlaceUserProps) {
  const [type, setType] = useState<PlaceType | "">("");
  const [countryId, setCountryId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredRegions = countryId
    ? regions.filter(r => r.countryId === countryId)
    : [];

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type) return alert("Select a type first.");

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawName = formData.get("name") as string;
    const name = rawName.trim().charAt(0).toUpperCase() + rawName.trim().slice(1);

    let options = {};

    // BUILD OPTIONS ONLY WHEN NEEDED
    if (type === "region") {
      if (!countryId) return alert("Select a country.");
      options = { countryId };
    }

    if (type === "takeoff" || type === "landing") {
      if (!countryId || !regionId)
        return alert("Select both country and region for takeoff/landing");

      const latitude = Number(formData.get("latitude"));
      const longitude = Number(formData.get("longitude"));
      const altitude = Number(formData.get("altitude"));

      if (Number.isNaN(latitude) || Number.isNaN(longitude) || Number.isNaN(altitude))
        return alert("Latitude, longitude, and altitude are required and must be numbers.");

      options = { countryId, regionId, latitude, longitude, altitude };
    }

    const rez = await addPlace(type as PlaceType, name, options);

    setLoading(false);

    if (!rez.success) return alert("❌ " + rez.message);

    window.location.href = `/admin/editplace?type=${type}&id=${rez.id}`;
  };

  return (
    <div className="w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Place</h2>

      <form onSubmit={handleCreate} className="space-y-4">
        {/* TYPE */}
        <div>
          <label className="block font-medium mb-1">Type:</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as PlaceType);
              setCountryId(null);
              setRegionId(null);
            }}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select type</option>
            <option value="country">Country</option>
            <option value="region">Region</option>
            <option value="takeoff">Takeoff</option>
            <option value="landing">Landing</option>
          </select>
        </div>

        {/* COUNTRY */}
        {(type === "region" || type === "takeoff" || type === "landing") && (
          <div>
            <label className="block font-medium mb-1">Country:</label>
            <select
              value={countryId ?? ""}
              onChange={(e) => setCountryId(Number(e.target.value))}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select country</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* REGION */}
        {(type === "takeoff" || type === "landing") && countryId && (
          <div>
            <label className="block font-medium mb-1">Region:</label>
            <select
              value={regionId ?? ""}
              onChange={(e) => setRegionId(Number(e.target.value))}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select region</option>
              {filteredRegions.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* NAME */}
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* LAT / LNG / ALT only for takeoff + landing */}
        {(type === "takeoff" || type === "landing") && (
          <>
            <input type="number" step="0.0001" name="latitude" placeholder="Latitude" className="w-full border p-2 rounded-md" required />
            <input type="number" step="0.0001" name="longitude" placeholder="Longitude" className="w-full border p-2 rounded-md" required />
            <input type="number" name="altitude" placeholder="Altitude" className="w-full border p-2 rounded-md" required />
          </>
        )}

        {/* SUBMIT */}
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
