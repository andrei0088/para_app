<<<<<<< HEAD
"use client";

import { useState } from "react";
import { BasePlace, Country, Region, PlaceType } from "@/app/types";
import { updatePlace } from "@/app/api/actions/update_places";

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
  const [form, setForm] = useState<BasePlace>({ ...initialData });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Helper strict typing
  const updateField = <K extends keyof BasePlace>(key: K, value: BasePlace[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await updatePlace(type, form);
      if (res.success) {
        setMessage("✅ Place updated successfully!");
      } else {
        setMessage("❌ Error updating place");
      }
    } catch (err) {
      setMessage("❌ Unexpected error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrăm regiunile în funcție de țară
  const filteredRegions: Region[] =
    form.countryId != null
      ? regions.filter((r) => r.countryId === form.countryId)
      : [];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-bold">{`Edit ${type}`}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={form.description ?? ""}
            onChange={(e) =>
              updateField("description", e.target.value || undefined)
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Country */}
        {(type === "region" || type === "takeoff" || type === "landing") && (
          <div>
            <label className="block font-medium mb-1">Country</label>
            <select
              value={form.countryId ?? ""}
              onChange={(e) =>
                updateField(
                  "countryId",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Region */}
        {(type === "takeoff" || type === "landing") && form.countryId && (
          <div>
            <label className="block font-medium mb-1">Region</label>
            <select
              value={form.regionId ?? ""}
              onChange={(e) =>
                updateField(
                  "regionId",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select region</option>
              {filteredRegions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Latitude / Longitude / Altitude */}
        {(type === "takeoff" || type === "landing") && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Latitude</label>
              <input
                type="number"
                value={form.latitude ?? ""}
                onChange={(e) =>
                  updateField(
                    "latitude",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Longitude</label>
              <input
                type="number"
                value={form.longitude ?? ""}
                onChange={(e) =>
                  updateField(
                    "longitude",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Altitude</label>
              <input
                type="number"
                value={form.altitude ?? ""}
                onChange={(e) =>
                  updateField(
                    "altitude",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {message && (
          <p className="text-sm text-center mt-2">{message}</p>
        )}
      </form>
    </div>
=======
// app/admin/editplace/page.tsx
import EditPlaceForm from "./EditPlaceForm";
import {
  get_country_by_id,
  get_regions_by_id,
  get_takeoff_by_id,
  get_landing_by_id,
  get_all_regions,
  get_all_country,
} from "@/app/api/get/get_places";
import { BasePlace, Country, Region, PlaceType } from "@/app/types";

interface Props {
  searchParams: { type?: string; id?: string };
}

// Helper to convert null => undefined
function sanitizePlace<T extends Record<string, unknown>>(data: T): BasePlace {
  return {
    id: typeof data.id === "number" ? data.id : 0,
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : undefined,
    latitude: typeof data.latitude === "number" ? data.latitude : undefined,
    longitude: typeof data.longitude === "number" ? data.longitude : undefined,
    countryId: typeof data.countryId === "number" ? data.countryId : undefined,
    regionId: typeof data.regionId === "number" ? data.regionId : undefined,
    bestSeason: Array.isArray(data.bestSeason) ? data.bestSeason.map(Number) : undefined,
    map: typeof data["map"] === "string" ? data["map"] : undefined,
    altitude: typeof data["altitude"] === "number" ? data["altitude"] : undefined,
  };
}

export default async function EditPlacePage({ searchParams }: Props) {
  const typeParam = searchParams.type as PlaceType | undefined;
  const id = searchParams.id ? Number(searchParams.id) : undefined;

  if (!typeParam || !id) return <p>Invalid parameters.</p>;

  let data: Record<string, unknown> | null = null;

  switch (typeParam) {
    case "country":
      data = await get_country_by_id({ id });
      break;
    case "region":
      data = await get_regions_by_id({ id });
      break;
    case "takeoff":
      data = await get_takeoff_by_id({ id });
      break;
    case "landing":
      data = await get_landing_by_id({ id });
      break;
    default:
      return <p>Invalid type.</p>;
  }

  if (!data) return <p>Not found.</p>;

  const sanitizedData = sanitizePlace(data);

  const countries: Country[] = await get_all_country();
  const regions: Region[] = await get_all_regions();

  return (
    <EditPlaceForm
      type={typeParam}
      initialData={sanitizedData}
      countries={countries}
      regions={regions}
    />
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  );
}
