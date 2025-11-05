"use client";

import { useEffect, useState } from "react";

interface Country {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
  countryId: number;
}

interface Props {
  countries: Country[];
  regions: Region[];
  selected: { countryId: number | null; regionId: number | null };
  onSelect: (countryId: number | null, regionId: number | null) => void;
}

export default function SearchMapComp({ countries, regions, selected, onSelect }: Props) {
  const [countryId, setCountryId] = useState<number | null>(selected.countryId);
  const [regionId, setRegionId] = useState<number | null>(selected.regionId);

  const filteredRegions = regions.filter(r => !countryId || r.countryId === countryId);

  // apelăm onSelect doar când se schimbă valorile
  useEffect(() => {
    onSelect(countryId, regionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, regionId]);

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={countryId ?? ""}
        onChange={e => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          setCountryId(val);
          setRegionId(null);
        }}
        className="border rounded p-2"
      >
        <option value="">Select a country</option>
        {countries.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        value={regionId ?? ""}
        onChange={e => setRegionId(e.target.value ? parseInt(e.target.value) : null)}
        className="border rounded p-2"
      >
        <option value="">Select a region</option>
        {filteredRegions.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>
    </div>
  );
}
