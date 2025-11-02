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


export default function MapPageClient({ countries, regions, initialSites, initialCenter, defaultSelected }: MapPageClientProps) {
  const [selected, setSelected] = useState<{ countryId: number | null; regionId: number | null }>({
    countryId: defaultSelected?.countryId ?? null,
    regionId: defaultSelected?.regionId ?? null,
  });

  return (
    <div className="flex flex-col h-screen w-full">
      <SearchMapComp
        countries={countries}
        regions={regions}
        selected={selected}
        onSelect={(countryId, regionId) => setSelected({ countryId, regionId })}
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
