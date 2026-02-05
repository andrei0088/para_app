"use client";

import dynamic from "next/dynamic";
import { Site } from "../types";
import { Landing, Takeoff } from "@prisma/client";

type Community = {
  id: number;
  name: string;
  url: string;
  latitude: number;
  longitude: number;
};

interface Props {
  takeoffs: Takeoff[];
  landings: Landing[];
  selected: { lat: number | null; lng: number | null };
  zoom: number;
  community: Community[];
}

// Importăm MapView doar pe client, cu loader
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[40vh]">
      <p className="text-gray-500 animate-pulse">Loading map...</p>
    </div>
  ),
});

export default function MapClientWrapper({
  takeoffs,
  landings,
  selected,
  zoom,
  community,
}: Props) {
  const initialCenter: [number, number] = [45.7, 7];

  const initialSites: Site[] = [
    ...takeoffs.map((t) => ({
      id: t.id,
      name: t.name,
      latitude: t.latitude,
      longitude: t.longitude,
      countryId: t.countryId,
      regionId: t.regionId,
      type: "takeoff" as const,
      map: t.map,
      seo: t.seo,
      wind: t.wind,
      altitude: t.altitude,
    })),
    ...landings.map((l) => ({
      id: l.id,
      name: l.name,
      latitude: l.latitude,
      longitude: l.longitude,
      countryId: l.countryId,
      regionId: l.regionId,
      type: "landing" as const,
      map: l.map,
      seo: l.seo,
      altitude: l.altitude,
    })),
  ]; // Dacă avem coordonate valide, le folosim ca centru
  const center: [number, number] =
    selected.lat !== null && selected.lng !== null
      ? [selected.lat, selected.lng]
      : initialCenter;
  return (
    <MapView
      allSites={initialSites}
      center={center}
      zoom={zoom}
      community={community}
    />
  );
}
