"use client";

import dynamic from "next/dynamic";

type Coords = {
  lat: number;
  lng: number;
};

const MapLeaflet = dynamic(() => import("./MapLeaflet"), {
  ssr: false,
});

export default function CustomMap({
  onSelect,
}: {
  onSelect: (coords: Coords) => void;
}) {
  return <MapLeaflet onSelect={onSelect} />;
}
