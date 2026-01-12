"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Country {
  id: number;
  name: string;
}
interface Region {
  id: number;
  name: string;
  bestSeason?: number[];
}
interface HomeFormProps {
  countrys: Country[];
  regions: Region[];
  seasons: number[];
  months: number[];
}

export default function HomeForm({
  countrys,
  regions,
  seasons,
  months,
}: HomeFormProps) {
  const router = useRouter();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const seasonNames: Record<number, string> = {
    1: "Spring",
    2: "Summer",
    3: "Autumn",
    4: "Winter",
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!value) return;

    switch (name) {
      case "country":
        router.push(`/country/${value}`);
        break;
      case "region":
        router.push(`/region/${value}`);
        break;
      case "season":
        router.push(`/season/${value}`);
        break;
      case "month":
        router.push(`/month/${value}`);
        break;
    }
  };

  return (
    <form className="flex flex-wrap items-end gap-4 bg-white text-gray-800  p-4 max-w-full">
      {/* Country */}
      <div className="flex flex-col flex-1 min-w-[150px]">
        <label htmlFor="country" className="mb-1 font-medium text-gray-700 ">
          Country
        </label>
        <select
          name="country"
          id="country"
          onChange={handleChange}
          className="border border-gray-300  rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-100  transition-colors duration-200"
        >
          <option value="">Select a country</option>
          {countrys.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div className="flex flex-col flex-1 min-w-[150px]">
        <label htmlFor="region" className="mb-1 font-medium text-gray-700 ">
          Region
        </label>
        <select
          name="region"
          id="region"
          onChange={handleChange}
          className="border border-gray-300  rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-100  transition-colors duration-200"
        >
          <option value="">Select a region</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Season */}
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label htmlFor="season" className="mb-1 font-medium text-gray-700 ">
          Season
        </label>
        <select
          name="season"
          id="season"
          onChange={handleChange}
          className="border border-gray-300  rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-100  transition-colors duration-200"
        >
          <option value="">Select a season</option>
          {seasons.map((s) => (
            <option key={s} value={s}>
              {seasonNames[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label htmlFor="month" className="mb-1 font-medium text-gray-700 ">
          Month
        </label>
        <select
          name="month"
          id="month"
          onChange={handleChange}
          className="border border-gray-300  rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-100  transition-colors duration-200"
        >
          <option value="">Select a month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {monthNames[m - 1]}
            </option>
          ))}
        </select>
      </div>

      {/* Submit button (disabled) */}
      <div className="flex justify-end min-w-[120px]">
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="bg-gray-700 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-sm font-medium transition-colors"
        >
          Filter
        </button>
      </div>
    </form>
  );
}
