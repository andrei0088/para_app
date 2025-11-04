"use client";

import { useState } from "react";
import RichEditor from "./Editor";
import { updatePlace } from "@/app/api/actions/update_places";
import { Country, Region, BasePlace, PlaceType } from "@/app/types";

interface EditPlaceFormProps {
  type: PlaceType;
  initialData: BasePlace;
  countries: Country[];
  regions: Region[];
}

export default function EditPlaceForm({
  type,
  initialData,
  countries,
  regions,
}: EditPlaceFormProps) {
  const [formData, setFormData] = useState<BasePlace>(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | { type: "success" | "error"; text: string }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMessage(null);

    if (name === "bestSeason") {
      setFormData({ ...formData, bestSeason: value.split(",").map(v => Number(v.trim())) });
    } else if (name === "countryId" || name === "regionId") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = (value: string) => {
    setMessage(null);
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePlace(type, formData);
      setMessage({ type: "success", text: "✅ Changes saved successfully!" });
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setMessage({ type: "error", text: "❌ Error: " + errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const filteredRegions = formData.countryId ? regions.filter(r => r.countryId === formData.countryId) : regions;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-6 bg-white rounded shadow">
      {Object.entries(formData).map(([key, value]) => {
        if (key === "id") return null;

        // Description field
        if (key === "description") {
          return (
            <div key={key}>
              <label className="block font-bold mb-1 capitalize">{key}</label>
              <RichEditor value={value != null ? String(value) : ""} onChange={handleDescriptionChange} />
            </div>
          );
        }

        // bestSeason
        if (key === "bestSeason" && Array.isArray(value)) {
          return (
            <div key={key}>
              <label className="block font-bold mb-1 capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={value.join(",")}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          );
        }

        // Country dropdown
        if ((type === "region" || type === "takeoff" || type === "landing") && key === "countryId") {
          return (
            <div key={key}>
              <label className="block font-bold mb-1 capitalize">Country</label>
              <select
                name="countryId"
                value={value ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select country</option>
                {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          );
        }

        // Region dropdown
        if ((type === "takeoff" || type === "landing") && key === "regionId") {
          return (
            <div key={key}>
              <label className="block font-bold mb-1 capitalize">Region</label>
              <select
                name="regionId"
                value={value ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select region</option>
                {filteredRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          );
        }

        // Default text input
        return (
          <div key={key}>
            <label className="block font-bold mb-1 capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={value != null ? String(value) : ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        );
      })}

      {message && (
        <div
          className={`p-3 rounded font-medium ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
