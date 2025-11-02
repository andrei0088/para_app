'use client'

import { useRouter } from "next/navigation";
import React from "react";

interface Country { id: number; name: string; }
interface Region { id: number; name: string; bestSeason?: number[]; }
interface HomeFormProps {
  countrys: Country[];
  regions: Region[];
  seasons: number[];
  months: number[];
}

export default function HomeForm({ countrys, regions, seasons, months }: HomeFormProps) {
  const router = useRouter();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const seasonNames: Record<number, string> = {
    1: "Spring",
    2: "Summer",
    3: "Autumn",
    4: "Winter"
  };

  // Handler general pentru select-uri
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, New value: ${value}`);
    if(!value) return;

    switch(name) {
      case "country":
        router.push(`/country/${value}`);
        break;
      case "region":
        router.push(`/region/${value}`);
        break;
      case "season":
        router.push(`/seson/${value}`);
        break;
      case "month":
        router.push(`/month/${value}`);
        break;
    }
  };

  return (
    <form className="flex flex-wrap items-end gap-4 bg-white p-4 rounded-xl shadow-md max-w-full">
      {/* Country */}
      <div className="flex flex-col flex-1 min-w-[150px]">
        <label htmlFor="country" className="mb-1 font-medium text-gray-700">Country</label>
        <select name="country" id="country" onChange={handleChange} className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400">
          <option value="">Select a country</option>
          {countrys.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Region */}
      <div className="flex flex-col flex-1 min-w-[150px]">
        <label htmlFor="region" className="mb-1 font-medium text-gray-700">Region</label>
        <select name="region" id="region" onChange={handleChange} className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400">
          <option value="">Select a region</option>
          {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      {/* Season */}
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label htmlFor="season" className="mb-1 font-medium text-gray-700">Season</label>
        <select name="season" id="season" onChange={handleChange} className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400">
          <option value="">Select a season</option>
          {seasons.map(s => <option key={s} value={s}>{seasonNames[s]}</option>)}
        </select>
      </div>

      {/* Month */}
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label htmlFor="month" className="mb-1 font-medium text-gray-700">Month</label>
        <select name="month" id="month" onChange={handleChange} className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400">
          <option value="">Select a month</option>
          {months.map(m => <option key={m} value={m}>{monthNames[m - 1]}</option>)}
        </select>
      </div>
      <div className="flex justify-end min-w-[120px]">
        <button
          type="submit"
          disabled={true}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          Filter
        </button>
      </div>
    </form>
  );
}
