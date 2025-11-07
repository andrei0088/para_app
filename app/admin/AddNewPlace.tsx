"use client"

import React, { useState, FormEvent } from "react";
import { Country, Region } from "../types";
import { add_country, add_region } from "./lib/admin";
import { capitalizeFirstLetter } from "better-auth";

type PlaceType = "country" | "region" | "takeoff" | "landing";

interface AddPlaceUserProps {
  countries: Country[];
  regions: Region[];
}

export default function AddPlaceUser({ countries, regions }: AddPlaceUserProps) {
    const [type, setType] = useState<PlaceType | "">('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Validation
        if (!type) return setMessage("Please select what you want to add.");
        if (!name.trim()) return setMessage("Please enter a valid name.");

        // Add country
        if (type === "country") {
            const result = await add_country(name.trim());
            if (result.success) setMessage(`Country "${name}" has been added with ID ${result.rez}.`);
            else setMessage(`Error: ${result.error}`);
        }

        // Add region
        if (type === "region") {
            if (!country) return setMessage("Please select a country first.");
            const result = await add_region(name.trim(), Number(country));
            if (result.success) setMessage(`Region "${name}" has been added with ID ${result.rez}.`);
            else setMessage(`Error: ${result.error}`);
        }

        // Placeholder for future features
        if (type === "takeoff") setMessage("Takeoff feature not implemented yet.");
        if (type === "landing") setMessage("Landing feature not implemented yet.");
    }

    return (
        <div className="max-w-md mx-auto p-4">
            {message && <p className="mb-2 text-blue-700">{message}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Select Type */}
                <label htmlFor="type">Select item type:</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => { setType(e.target.value as PlaceType); setCountry(''); setRegion(''); }}
                    className="w-full border p-2 rounded-md"
                    required
                >
                    <option value="">-- Choose type --</option>
                    <option value="country">Country</option>
                    <option value="region">Region</option>
                    <option value="takeoff">Takeoff</option>
                    <option value="landing">Landing</option>
                </select>

                {/* Select Country for Region/Takeoff/Landing */}
                {(type && type !== "country") && (
                    <>
                        <label htmlFor="country">Select a country:</label>
                        <select
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full border p-2 rounded-md"
                            required
                        >
                            <option value="">-- Choose a country --</option>
                            {countries.map(c => (
                                <option value={c.id} key={`country-${c.id}`}>{c.name}</option>
                            ))}
                        </select>
                    </>
                )}

                {/* Select Region for Takeoff/Landing */}
                {(type && type !== "country" && type !== "region") && (
                    <>
                        <label htmlFor="region">Select a region:</label>
                        <select
                            id="region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full border p-2 rounded-md"
                            required
                        >
                            <option value="">-- Choose a region --</option>
                            {regions.map(r => {
                                if (!country || Number(country) === r.countryId) {
                                    return <option value={r.id} key={`region-${r.id}`}>{r.name}</option>
                                }
                                return null;
                            })}
                        </select>
                    </>
                )}

                {/* Name Input */}
                <label htmlFor="name">Enter Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                    placeholder="Type the name here"
                    className="border p-2 rounded-md"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
