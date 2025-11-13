"use client";

import { Takeoff } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { update_takeoff } from "./action";

interface Option {
  id: number;
  name: string;
  countryId?: number;
}

interface TakeoffEditProps {
  takeoff: Takeoff;
  countries: Option[];
  regions: Option[];
}

// ✅ onSave este async acum
async function onSave(updated: Takeoff) {
  const rez = await update_takeoff(updated);
  if (rez.success)
    return { success: true, message: rez.message || "Edit successful!" };
  else
    return {
      success: false,
      message: rez.message || "Error updating takeoff.",
    };
}

export default function TakeoffEdit({
  takeoff,
  countries,
  regions,
}: TakeoffEditProps) {
  const [map, setMap] = useState(takeoff.map ?? "");
  const [name, setName] = useState(takeoff.name);
  const [latitude, setLatitude] = useState(takeoff.latitude ?? "");
  const [longitude, setLongitude] = useState(takeoff.longitude ?? "");
  const [altitude, setAltitude] = useState(takeoff.altitude ?? "");
  const [countryId, setCountryId] = useState(takeoff.countryId);
  const [regionId, setRegionId] = useState(takeoff.regionId);
  const [description, setDescription] = useState(takeoff.description ?? "");
  const [seo, setSeo] = useState(takeoff.seo ?? "");
  const [wind, setWind] = useState(takeoff.wind ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const updated: Takeoff = {
      ...takeoff,
      map,
      name,
      countryId,
      regionId,
      latitude: Number(latitude),
      longitude: Number(longitude),
      altitude: Number(altitude),
      description,
      seo,
      wind,
    };

    const res = await onSave(updated);
    setMessage(res.message);
    setSaving(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Takeoff</h2>
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 underline hover:underline-offset-2 transition-all duration-200"
        >
          Back to admin page
        </Link>
      </div>

      {/* Mesaj feedback */}
      {message && (
        <p
          className={`mt-2 ${
            message.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* ID + Name */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 flex flex-col">
          <label className="font-medium">ID</label>
          <input
            type="text"
            className="border p-2 rounded w-fit bg-gray-100"
            value={takeoff.id}
            disabled
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="font-medium">Name</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {/* Country & Region */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 flex flex-col">
          <label className="font-medium">Country</label>
          <select
            className="border p-2 rounded w-full"
            value={countryId}
            onChange={(e) => setCountryId(Number(e.target.value))}
          >
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-medium">Region</label>
          <select
            className="border p-2 rounded w-full"
            value={regionId}
            onChange={(e) => setRegionId(Number(e.target.value))}
          >
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Coordinates & Altitude */}
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col">
          <label className="font-medium">Latitude</label>
          <input
            type="number"
            step="any"
            className="border p-2 rounded"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-medium">Longitude</label>
          <input
            type="number"
            step="any"
            className="border p-2 rounded"
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-medium">Altitude</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Map + Wind */}
      <div className="flex gap-5">
        <div className="w-1/2">
          <label className="font-medium">Map</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={map}
            onChange={(e) => setMap(e.target.value)}
          />
        </div>

        <div className="w-1/2">
          <label className="font-medium">Wind direction</label>
          <input
            type="text"
            className="border p-2 rounded w-full uppercase"
            value={wind}
            onChange={(e) => setWind(e.target.value.toUpperCase())}
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="font-medium">Description</label>
        <textarea
          className="border p-2 rounded w-full"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* SEO */}
      <div className="flex flex-col">
        <label className="font-medium">SEO</label>
        <textarea
          className="border p-2 rounded w-full"
          rows={2}
          value={seo}
          onChange={(e) => setSeo(e.target.value)}
        />
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded text-white ${
            saving ? "bg-gray-400" : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
