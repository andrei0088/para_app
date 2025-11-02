"use client";

import { useState, useEffect } from "react";

interface Country { id: number; name: string; }
interface Region { id: number; name: string; countryId: number; }

interface Props {
  countries: Country[];
  regions: Region[];
  selected: { countryId: number | null; regionId: number | null };
  onSelect: (countryId: number | null, regionId: number | null) => void;
}

export default function SearchMapComp({ countries, regions, selected, onSelect }: Props) {
  const [countryId, setCountryId] = useState<number | null>(selected.countryId);
  const [regionId, setRegionId] = useState<number | null>(selected.regionId);

  // Filtrăm regiunile în funcție de țară
  const filteredRegions = countryId
    ? regions.filter(r => r.countryId === countryId)
    : regions;

  // Efect care sincronizează dropdown-urile cu selecția
  useEffect(() => {
    // Dacă există regiune, actualizează automat țara
    if (regionId) {
      const region = regions.find(r => r.id === regionId);
      if (region) setCountryId(region.countryId);
    }
    onSelect(countryId, regionId);
  }, [countryId, regionId]);

  return (
    <div className="flex gap-4 mb-4">
      {/* Dropdown Country */}
      <select
        value={countryId ?? ""}
        onChange={e => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          setCountryId(val);
          setRegionId(null); // resetăm regiunea dacă schimbăm țara manual
        }}
        className="border rounded p-2"
      >
        <option value="">Selectează o țară</option>
        {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      {/* Dropdown Region */}
      <select
        value={regionId ?? ""}
        onChange={e => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          setRegionId(val);
        }}
        className="border rounded p-2"
      >
        <option value="">Selectează o regiune</option>
        {filteredRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
    </div>
  );
}
