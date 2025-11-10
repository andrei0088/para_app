"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Site {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: "takeoff" | "landing";
}

// Icon-uri custom
const takeoffIcon = new L.Icon({
  iconUrl: "/icons/takeoff.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const landingIcon = new L.Icon({
  iconUrl: "/icons/landing.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component pentru a recentra harta când center se schimbă
function MapAutoCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: true });
  return null;
}

interface MapViewProps {
  allSites: Site[];
  center: [number, number];
}

export default function MapView({ allSites, center }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <MapAutoCenter center={center} />

      {allSites.map((site) => {
        const icon = site.type === "takeoff" ? takeoffIcon : landingIcon;
        const link =
          site.type === "takeoff"
            ? `/takeoff/${site.id}`
            : `/landing/${site.id}`;

        return (
          <Marker
            key={`${site.type}=${site.id}`}
            position={[site.latitude, site.longitude]}
            icon={icon}
          >
            <Popup>
              <a href={link} className="text-blue-600 underline">
                {site.name}
              </a>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
