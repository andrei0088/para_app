"use client";

import { useState } from "react";
import SearchMapComp from "./SearchMapComp";
import MapClientWrapper from "./MapClientWrapper";
import { Site, Country, Region } from "@/app/types";

interface MapPageClientProps {
  countries: Country[];
  regions: Region[];
  initialSites: Site[];
  initialCenter: [number, number];
  defaultSelected?: { countryId: number | null; regionId: number | null };
}

export default function MapPageClient({
  countries,
  regions,
  initialSites,
  initialCenter,
  defaultSelected,
}: MapPageClientProps) {
  const [selected, setSelected] = useState<{
    countryId: number | null;
    regionId: number | null;
  }>({
    countryId: defaultSelected?.countryId ?? null,
    regionId: defaultSelected?.regionId ?? null,
  });

  // funcție stabilă care nu se recreează la fiecare render
  const handleSelect = (countryId: number | null, regionId: number | null) => {
    setSelected((prev) => {
      // actualizează doar dacă s-a schimbat ceva
      if (prev.countryId === countryId && prev.regionId === regionId)
        return prev;
      return { countryId, regionId };
    });
  };

  return (
    <div className="flex flex-col h-[80vh] w-full text-gray-800 mt-5 z-40 ">
      <SearchMapComp
        countries={countries}
        regions={regions}
        selected={selected}
        onSelect={handleSelect} // folosim funcția stabilă
      />
      <div className="flex-1">
        <MapClientWrapper
          allSites={initialSites}
          initialCenter={initialCenter}
          selected={selected}
        />
      </div>
    </div>
  );
}
