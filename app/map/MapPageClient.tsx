"use client";

import { useEffect, useState } from "react";
import SearchMapComp from "./SearchMapComp";
import MapClientWrapper from "./MapClientWrapper";
import { Country, Region, Takeoff, Landing } from "@prisma/client";
import SEO from "../components/Seo";
import MapGetParams from "./MapGetParams";

interface Props {
  countries: Country[];
  regions: Region[];
  takeoffs: Takeoff[];
  landings: Landing[];
}

export default function MapPageClient({
  countries,
  regions,
  takeoffs,
  landings,
}: Props) {
  const [selectedLatLng, setSelectedLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  const [zoom, setZoom] = useState<number>(7);

  const handleSelect = (
    id: number | null,
    type: string | null,
    newZoom: number | null
  ) => {
    if (!id || !type) return;

    if (type === "c") {
      const country = countries.find((c) => c.id === id);
      if (country?.latitude && country?.longitude) {
        setSelectedLatLng({ lat: country.latitude, lng: country.longitude });
      }
    }

    if (type === "r") {
      const region = regions.find((r) => r.id === id);
      if (region?.latitude && region?.longitude) {
        setSelectedLatLng({ lat: region.latitude, lng: region.longitude });
      }
    }

    if (type === "t") {
      const takeoff = takeoffs.find((t) => t.id === id);
      if (takeoff?.latitude && takeoff?.longitude) {
        setSelectedLatLng({ lat: takeoff.latitude, lng: takeoff.longitude });
      }
    }

    if (type === "l") {
      const landing = landings.find((l) => l.id === id);
      if (landing?.latitude && landing?.longitude) {
        setSelectedLatLng({ lat: landing.latitude, lng: landing.longitude });
      }
    }

    setZoom(newZoom ?? 7);
  };

  const params = MapGetParams();

  useEffect(() => {
    if (!params) return;

    handleSelect(params.id, params.type, null);
  }, [params?.id, params?.type]); // ✅ primitive deps only

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
          takeoffs={takeoffs}
          landings={landings}
          selected={selectedLatLng}
          zoom={zoom}
        />
      </div>
    </div>
  );
}
