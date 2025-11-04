"use client";

import { useState, useEffect } from "react";

<<<<<<< HEAD
interface Country {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
  countryId: number;
}
=======
interface Country { id: number; name: string; }
interface Region { id: number; name: string; countryId: number; }
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

interface Props {
  countries: Country[];
  regions: Region[];
  selected: { countryId: number | null; regionId: number | null };
  onSelect: (countryId: number | null, regionId: number | null) => void;
}

export default function SearchMapComp({ countries, regions, selected, onSelect }: Props) {
  const [countryId, setCountryId] = useState<number | null>(selected.countryId);
  const [regionId, setRegionId] = useState<number | null>(selected.regionId);

<<<<<<< HEAD
  // Filtrăm regiunile pentru dropdown
  const filteredRegions = regions.filter(r => !countryId || r.countryId === countryId);

  // Sincronizăm selecția la mount și când se schimbă dropdown-urile
  useEffect(() => {
    onSelect(countryId, regionId);
  }, [countryId, regionId, onSelect]);

  return (
    <div className="flex gap-4 mb-4">
      {/* Dropdown Țară */}
=======
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
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
      <select
        value={countryId ?? ""}
        onChange={e => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          setCountryId(val);
<<<<<<< HEAD
          setRegionId(null); // resetăm regiunea când schimbăm țara
=======
          setRegionId(null); // resetăm regiunea dacă schimbăm țara manual
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
        }}
        className="border rounded p-2"
      >
        <option value="">Selectează o țară</option>
<<<<<<< HEAD
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
=======
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
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
      </select>
    </div>
  );
}
