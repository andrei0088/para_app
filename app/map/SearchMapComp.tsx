"use client";

import { useState, useEffect } from "react";

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

  // Filtrăm regiunile pentru dropdown
  const filteredRegions = regions.filter(r => !countryId || r.countryId === countryId);

  // Sincronizăm selecția la mount și când se schimbă dropdown-urile
  useEffect(() => {
    onSelect(countryId, regionId);
  }, [countryId, regionId, onSelect]);

  return (
    <div className="flex gap-4 mb-4">
      {/* Dropdown Țară */}
      <select
        value={countryId ?? ""}
        onChange={e => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          setCountryId(val);
          setRegionId(null); // resetăm regiunea când schimbăm țara
        }}
        className="border rounded p-2"
      >
        <option value="">Selectează o țară</option>
        {countries.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* Dropdown Regiune */}
      <select
        value={regionId ?? ""}
        onChange={e => setRegionId(e.target.value ? parseInt(e.target.value) : null)}
        className="border rounded p-2"
      >
        <option value="">Selectează o regiune</option>
        {filteredRegions.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>
    </div>
  );
}
