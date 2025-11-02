"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface Site {
  id: number;
  latitude: number;
  longitude: number;
  name?: string;
}

interface MapGenerateProps {
  center: [number, number];
  takeoff?: Site[];
  landing?: Site[];
  zoom? : number
}

export default function MidleMapHandler({ center, takeoff = [], landing = [] , zoom}: MapGenerateProps) {
  return <MapView center={center} takeoff={takeoff} landing={landing}   zoom={zoom ?? 8}
/>;
}
