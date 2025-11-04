"use client";

import { useState } from "react";
import { addPlace } from "@/app/api/actions/update_places";
<<<<<<< HEAD
import type { PlaceType } from "@/app/types";
=======
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

type Country = { id: number; name: string };
type Region = { id: number; name: string; countryId: number };

interface AddPlaceUserProps {
  countries: Country[];
  regions: Region[];
}

export default function AddPlaceUser({ countries, regions }: AddPlaceUserProps) {
<<<<<<< HEAD
  const [type, setType] = useState<PlaceType | "">("");
=======
  const [type, setType] = useState("");
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  const [countryId, setCountryId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  const filteredRegions = countryId
    ? regions.filter(r => r.countryId === countryId)
    : [];

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type) return alert("Select a type first.");
=======
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type) return alert("Select a type");
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawName = formData.get("name") as string;
<<<<<<< HEAD
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

=======
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

>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  return (
    <div className="w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Place</h2>

      <form onSubmit={handleCreate} className="space-y-4">
<<<<<<< HEAD
        {/* TYPE */}
=======
        {/* Type */}
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
        <div>
          <label className="block font-medium mb-1">Type:</label>
          <select
            value={type}
<<<<<<< HEAD
            onChange={(e) => {
              setType(e.target.value as PlaceType);
              setCountryId(null);
              setRegionId(null);
            }}
            className="w-full border p-2 rounded-md"
            required
=======
            onChange={(e) => { setType(e.target.value); setCountryId(null); setRegionId(null); }}
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
          >
            <option value="">Select type</option>
            <option value="country">Country</option>
            <option value="region">Region</option>
            <option value="takeoff">Takeoff</option>
            <option value="landing">Landing</option>
          </select>
        </div>

<<<<<<< HEAD
        {/* COUNTRY */}
=======
        {/* Country */}
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
        {(type === "region" || type === "takeoff" || type === "landing") && (
          <div>
            <label className="block font-medium mb-1">Country:</label>
            <select
              value={countryId ?? ""}
              onChange={(e) => setCountryId(Number(e.target.value))}
<<<<<<< HEAD
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select country</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
=======
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select country</option>
              {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
            </select>
          </div>
        )}

<<<<<<< HEAD
        {/* REGION */}
=======
        {/* Region */}
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
        {(type === "takeoff" || type === "landing") && countryId && (
          <div>
            <label className="block font-medium mb-1">Region:</label>
            <select
              value={regionId ?? ""}
              onChange={(e) => setRegionId(Number(e.target.value))}
<<<<<<< HEAD
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select region</option>
              {filteredRegions.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
=======
              className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select region</option>
              {filteredRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
            </select>
          </div>
        )}

<<<<<<< HEAD
        {/* NAME */}
=======
        {/* Name */}
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
<<<<<<< HEAD
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
=======
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
       

        {/* Submit */}
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
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
