"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

type Coords = {
  lat: number;
  lng: number;
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function ClickMarker({
  setMarker,
  onSelect,
}: {
  setMarker: (pos: [number, number]) => void;
  onSelect: (coords: Coords) => void;
}) {
  useMapEvents({
    click(e) {
      const lat = Number(e.latlng.lat.toFixed(5));
      const lng = Number(e.latlng.lng.toFixed(5));

      setMarker([lat, lng]);
      onSelect({ lat, lng });
    },
  });

  return null;
}

export default function MapLeaflet({
  onSelect,
}: {
  onSelect: (coords: Coords) => void;
}) {
  const [marker, setMarker] = useState<[number, number] | null>(null);

  return (
    <MapContainer
      center={[45.9432, 24.9668]}
      zoom={5}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickMarker setMarker={setMarker} onSelect={onSelect} />

      {marker && (
        <Marker position={marker}>
          <Popup>
            Lat: {marker[0]}, Lng: {marker[1]}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
