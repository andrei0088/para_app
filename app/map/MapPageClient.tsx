"use client";

import { useState } from "react";
import SearchMapComp from "./SearchMapComp";
import MapClientWrapper from "./MapClientWrapper";
import { Country, Region, Takeoff, Landing } from "@prisma/client";
import { Site } from "../types";
import SEO from "../components/Seo";

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

  // Zoom corect: număr simplu
  const [zoom, setZoom] = useState<number>(7);

  const handleSelect = (
    lat: number | null,
    lng: number | null,
    newZoom: number | null
  ) => {
    setSelectedLatLng({ lat, lng });
    setZoom(newZoom ?? 7);
  };

  return (
    <div className="flex flex-col h-[80vh] w-full text-gray-800 mt-5 z-40">
      <SEO title={""} description={""} />

      <SearchMapComp
        countries={countries}
        regions={regions}
        takeoffs={takeoffs}
        landings={landings}
        onSelect={handleSelect}
      />

      <div className="flex-1">
        <MapClientWrapper
          allSites={initialSites}
          selected={selectedLatLng}
          zoom={zoom} // trimite zoom-ul ca număr
        />
      </div>
    </div>
  );
}
