"use client";

import { Site } from "@/app/types";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[30vh]">
      <p className="text-gray-500 animate-pulse">Loading map...</p>
    </div>
  ),
});

interface MapGenerateProps {
  center: [number, number];
  takeoff?: Site[];
  landing?: Site[];
  zoom?: number;
}

export default function MidleMapHandler({
  center,
  takeoff = [],
  landing = [],
  zoom,
}: MapGenerateProps) {
  return (
    <MapView
      center={center}
      takeoff={takeoff}
      landing={landing}
      zoom={zoom ?? 8}
    />
  );
}
