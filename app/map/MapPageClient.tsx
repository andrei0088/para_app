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
    id: number | null,
    type: string | null,
    newZoom: number | null
  ) => {
    if (type === "c") {
      const country = countries.find((c) => c.id === id);
      if (country && country.latitude && country.longitude) {
        setSelectedLatLng({ lat: country.latitude, lng: country.longitude });
      }
    }
    if (type === "r") {
      const region = regions.find((r) => r.id === id);
      if (region && region.latitude && region.longitude) {
        setSelectedLatLng({ lat: region.latitude, lng: region.longitude });
      }
    }
    if (type === "t") {
      const takeoff = takeoffs.find((t) => t.id === id);
      if (takeoff && takeoff.latitude && takeoff.longitude) {
        setSelectedLatLng({ lat: takeoff.latitude, lng: takeoff.longitude });
      }
    }
    if (type === "l") {
      const landing = landings.find((l) => l.id === id);
      if (landing && landing.latitude && landing.longitude) {
        setSelectedLatLng({ lat: landing.latitude, lng: landing.longitude });
      }
    }
    if (selectedLatLng.lat === null || selectedLatLng.lng === null)
      setSelectedLatLng({ lat: null, lng: null });
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
