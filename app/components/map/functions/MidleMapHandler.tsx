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

type Community = {
  id: number;
  name: string;
  url: string;
  latitude: number;
  longitude: number;
};
interface MapGenerateProps {
  center: [number, number];
  takeoff?: Site[];
  landing?: Site[];
  community?: Community[];
  zoom?: number;
}

export default function MidleMapHandler({
  center,
  takeoff = [],
  landing = [],
  zoom,
  community,
}: MapGenerateProps) {
  return (
    <MapView
      center={center}
      takeoff={takeoff}
      landing={landing}
      zoom={zoom ?? 8}
      community={community}
    />
  );
}
