"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Country, Region, Select } from "@/app/types";

interface SearchElementProps {
  countrys: Country[];
  regions: Region[];
  select: Select;
}

export default function SearchElement({
  countrys,
  regions,
  select,
}: SearchElementProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState(select.country.id);
  const [selectedRegionId, setSelectedRegionId] = useState<number | "">("");
  const [selectedSeason, setSelectedSeason] = useState<number | "">(
    select.season ?? ""
  );
  const [selectedMonth, setSelectedMonth] = useState<number | "">(
    select.month ?? ""
  );

  const [availableSeasons, setAvailableSeasons] = useState<number[]>([]);
  const [availableMonths, setAvailableMonths] = useState<number[]>([]);

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

  const seasonRules = useMemo(
    () => [
      { id: 1, months: [3, 4, 5] },
      { id: 2, months: [6, 7, 8] },
      { id: 3, months: [9, 10, 11] },
      { id: 4, months: [12, 1, 2] },
    ],
    []
  );

  // Memorează regiunile filtrate pentru țara selectată
  const filteredRegions = useMemo(() => {
    return regions.filter((r) => r.countryId === selectedCountryId);
  }, [regions, selectedCountryId]);

  const updateSeasonsAndMonths = useCallback(
    (months: number[]) => {
      const seasonsSet = new Set<number>();
      months.forEach((m) => {
        seasonRules.forEach((s) => {
          if (s.months.includes(m)) seasonsSet.add(s.id);
        });
      });

      setAvailableMonths([...months].sort((a, b) => a - b));
      setAvailableSeasons(Array.from(seasonsSet).sort());
    },
    [seasonRules]
  );

  const updateSeasonsAndMonthsForCountry = useCallback(
    (countryId: number) => {
      const countryRegions = regions.filter((r) => r.countryId === countryId);
      const months = Array.from(
        new Set(countryRegions.flatMap((r) => r.bestSeason ?? []))
      );
      updateSeasonsAndMonths(months);
    },
    [regions, updateSeasonsAndMonths]
  );

  // Reset când se schimbă țara
  useEffect(() => {
    setSelectedRegionId("");
    setSelectedSeason("");
    setSelectedMonth("");
    updateSeasonsAndMonthsForCountry(selectedCountryId);
  }, [selectedCountryId, updateSeasonsAndMonthsForCountry]);

  // Update când se schimbă regiunea
  useEffect(() => {
    setSelectedSeason("");
    setSelectedMonth("");

    if (selectedRegionId === "") {
      updateSeasonsAndMonthsForCountry(selectedCountryId);
      return;
    }

    const region = filteredRegions.find((r) => r.id === selectedRegionId);
    if (region) updateSeasonsAndMonths(region.bestSeason ?? []);
  }, [
    selectedRegionId,
    selectedCountryId,
    filteredRegions,
    updateSeasonsAndMonths,
    updateSeasonsAndMonthsForCountry,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (selectedRegionId !== "") {
      router.push(`/region/${selectedRegionId}`);
      return;
    }

    if (selectedCountryId && selectedSeason === "" && selectedMonth === "") {
      router.push(`/country/${selectedCountryId}`);
      return;
    }

    const query = new URLSearchParams();
    if (selectedCountryId) query.append("country", String(selectedCountryId));
    if (selectedRegionId !== "")
      query.append("region", String(selectedRegionId));
    if (selectedSeason !== "") query.append("season", String(selectedSeason));
    if (selectedMonth !== "") query.append("month", String(selectedMonth));

    router.push(`/filter?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 md:gap-4 bg-gray-50  p-3 md:p-4 rounded-xl shadow-md max-w-full dark:text-gray-800 "
    >
      {/* Country */}
      <div className="flex flex-col flex-1 min-w-[140px]">
        <label
          htmlFor="country"
          className="mb-1 text-sm md:text-base font-medium text-gray-700 "
        >
          Country
        </label>
        <select
          id="country"
          className="border border-gray-300  rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400  transition"
          value={selectedCountryId}
          onChange={(e) => setSelectedCountryId(Number(e.target.value))}
        >
          {countrys.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div className="flex flex-col flex-1 min-w-[140px]">
        <label
          htmlFor="region"
          className="mb-1 text-sm md:text-base font-medium text-gray-700 "
        >
          Region
        </label>
        <select
          id="region"
          className="border border-gray-300  rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={selectedRegionId}
          onChange={(e) =>
            setSelectedRegionId(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
        >
          <option value="">All regions</option>
          {filteredRegions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Season */}
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label
          htmlFor="season"
          className="mb-1 text-sm md:text-base font-medium text-gray-700 "
        >
          Season
        </label>
        <select
          id="season"
          className="border border-gray-300  rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-4000 transition disabled:opacity-50 disabled:cursor-not-allowed"
          value={selectedSeason}
          onChange={(e) =>
            setSelectedSeason(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          disabled={!availableSeasons.length}
        >
          <option value="">Select a season</option>
          {availableSeasons.map((s) => (
            <option key={s} value={s}>
              {seasonNames[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="flex flex-col flex-1 min-w-[120px]">
        <label
          htmlFor="month"
          className="mb-1 text-sm md:text-base font-medium text-gray-700 "
        >
          Month
        </label>
        <select
          id="month"
          className="border border-gray-300  rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400  transition disabled:opacity-50 disabled:cursor-not-allowed"
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          disabled={!availableMonths.length}
        >
          <option value="">Select a month</option>
          {availableMonths.map((m) => (
            <option key={m} value={m}>
              {monthNames[m - 1]}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="flex items-end">
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all shadow-sm hover:shadow-md"
        >
          {loading ? "Filtering..." : "Filter"}
        </button>
      </div>
    </form>
  );
}
