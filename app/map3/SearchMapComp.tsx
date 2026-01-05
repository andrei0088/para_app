"use client";

import { Country, Region, Takeoff, Landing } from "@prisma/client";
import { useMemo, useState } from "react";

interface Props {
  countries: Country[];
  regions: Region[];
  takeoffs: Takeoff[];
  landings: Landing[];
  onSelect: (
    id: number | null,
    type: string | null,
    zoom: number | null
  ) => void;
}

export default function SearchMapComp({
  countries,
  regions,
  takeoffs,
  landings,
  onSelect,
}: Props) {
  const [countryId, setCountryId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [takeoffId, setTakeoffId] = useState<number | null>(null);
  const [landingId, setLandingId] = useState<number | null>(null);

  const filteredRegions = useMemo(
    () => regions.filter((r) => !countryId || r.countryId === countryId),
    [regions, countryId]
  );

  const filteredTakeoffs = useMemo(
    () => takeoffs.filter((t) => !regionId || t.regionId === regionId),
    [takeoffs, regionId]
  );

  const filteredLandings = useMemo(
    () => landings.filter((l) => !regionId || l.regionId === regionId),
    [landings, regionId]
  );

  return (
    <div className="flex gap-4 mb-4">
      {/* Country */}
      <select
        value={countryId ?? ""}
        onChange={(e) => {
          const val = e.target.value ? Number(e.target.value) : null;
          setCountryId(val);
          setRegionId(null);
          setTakeoffId(null);
          setLandingId(null);
          onSelect(val, "c", 7);
        }}
        className="border rounded p-2"
      >
        <option value="">Select a country</option>
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Region */}
      <select
        value={regionId ?? ""}
        onChange={(e) => {
          const val = e.target.value ? Number(e.target.value) : null;
          setRegionId(val);
          setTakeoffId(null);
          setLandingId(null);
          onSelect(val, "r", 11);
        }}
        className="border rounded p-2"
      >
        <option value="">Select a region</option>
        {filteredRegions.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      {/* Takeoff */}
      <select
        value={takeoffId ?? ""}
        onChange={(e) => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          setTakeoffId(val);
          onSelect(val, "t", 14);
        }}
        className="border rounded p-2"
      >
        <option value="">Select a takeoff</option>
        {filteredTakeoffs.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {/* Landing */}
      <select
        value={landingId ?? ""}
        onChange={(e) => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          setLandingId(val);
          onSelect(val, "l", 14);
        }}
        className="border rounded p-2"
      >
        <option value="">Select a landing</option>
        {filteredLandings.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
