"use client";

import { useState } from "react";
import CustomMap from "./CustomMap";
import { redirect } from "next/navigation";

type Coords = {
  lat: number;
  lng: number;
};

export default function CustomCountry() {
  const [latitude, setLatitude] = useState<number | "">("");
  const [longitude, setLongitude] = useState<number | "">("");
  const [message, setMessage] = useState<string | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

    const allowPM = formData.get("pm") === "on";

    const response = await fetch("/api/wing-up/create-country-community", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameCapitalized,
        latitude: Number(latitude),
        longitude: Number(longitude),
        allowPM,
      }),
    });
    let data = null;

    if (response.headers.get("content-length") !== "0") {
      data = await response.json();
    }
    if (!response.ok) {
      setMessage(data.message);
      return;
    }
    // daca da
    redirect(`/community/${data.url}`);
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4 ">
        Create a New Country Community
      </h1>

      <p className=" mb-8">
        Select the country center on the map or enter the coordinates manually.
        These values will be used as the default center point when viewing the
        country on the map.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* LEFT COLUMN */}
        <div className=" rounded-sm p-6 border border-gray-100">
          <span className="text-red-600">{message || ""}</span>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium ">Country Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Germany"
                className="mt-2 w-full border border-gray-200 rounded-sm p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition capitalize"
              />
            </div>

            <div>
              <label className="block font-medium ">Coordinates</label>
              <p className=" mt-1">
                Click on the map to set coordinates automatically, or enter them
                manually.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="">Longitude</label>
                  <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(Number(e.target.value))}
                    required
                    placeholder="e.g. 24.9668"
                    className="mt-2 w-full border border-gray-200 rounded-sm p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Latitude</label>
                  <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                    required
                    placeholder="e.g. 45.9432"
                    className="mt-2 w-full border border-gray-200 rounded-sm p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="local"
                  name="local"
                  className="w-4 h-4"
                  required
                />
                <span className="text-sm">Are you a local?</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" id="pm" name="pm" className="w-4 h-4" />
                <span className="text-sm">
                  Allow other pilots to contact you
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-800 text-white py-3 rounded-sm text-sm font-semibold hover:bg-cyan-900 transition mt-5"
            >
              Save Country Community
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden h-full">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">
              Select Location on Map
            </h2>
            <p className="text-sm text-gray-500">
              Click anywhere to place the marker. Coordinates will appear in the
              form.
            </p>
          </div>

          <div className="h-[60vh] md:h-[70vh]">
            <CustomMap
              onSelect={({ lat, lng }: Coords) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
