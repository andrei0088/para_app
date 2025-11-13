"use client";

import { useState } from "react";
import SearchMapComp from "./SearchMapComp";
import MapClientWrapper from "./MapClientWrapper";
import { Country, Region, Takeoff, Landing } from "@prisma/client";
import { Site } from "../types";

interface Props {
  countries: Country[];
  regions: Region[];
  takeoffs: Takeoff[];
  landings: Landing[];
  initialSites: Site[];
}

export default function MapPageClient({
  countries,
  regions,
  takeoffs,
  landings,
  initialSites,
}: Props) {
  const [selectedLatLng, setSelectedLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  const handleSelect = (lat: number | null, lng: number | null) => {
    console.log({ lat, lng });
    setSelectedLatLng({ lat, lng });
  };

  return (
    <div className="flex flex-col h-[80vh] w-full text-gray-800 mt-5 z-40">
      <SearchMapComp
        countries={countries}
        regions={regions}
        takeoffs={takeoffs}
        landings={landings}
        onSelect={handleSelect}
      />
      <div className="flex-1">
        <MapClientWrapper allSites={initialSites} selected={selectedLatLng} />
      </div>
    </div>
  );
}
