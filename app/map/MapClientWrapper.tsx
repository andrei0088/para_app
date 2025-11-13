"use client";

import dynamic from "next/dynamic";
import { Site } from "../types";

interface Props {
  allSites: Site[];
  selected: { lat: number | null; lng: number | null };
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

export default function MapClientWrapper({ allSites, selected }: Props) {
  const initialCenter: [number, number] = [45.7, 7];

  // Dacă avem coordonate valide, le folosim ca centru
  const center: [number, number] =
    selected.lat !== null && selected.lng !== null
      ? [selected.lat, selected.lng]
      : initialCenter;

  return <MapView allSites={allSites} center={center} zoom={7} />;
}
