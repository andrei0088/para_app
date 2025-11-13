"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface Site {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: "takeoff" | "landing";
  wind?: string | null;
  altitude: number;
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

// 🔹 Componentă care recentrează și resetează zoom-ul
function MapAutoCenter({
  center,
  resetZoom,
}: {
  center: [number, number];
  resetZoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    // când centrul se schimbă, recentrăm și setăm zoom-ul din nou
    map.setView(center, resetZoom, { animate: true });
  }, [center, resetZoom, map]);

  return null;
}

interface MapViewProps {
  allSites: Site[];
  center: [number, number];
  zoom: number;
}

export default function MapView({ allSites, center, zoom }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* 🔹 Adăugăm componenta care resetează zoom-ul când centrul se schimbă */}
      <MapAutoCenter center={center} resetZoom={zoom || 7} />

      {allSites.map((site) => {
        const icon = site.type === "takeoff" ? takeoffIcon : landingIcon;
        const link =
          site.type === "takeoff"
            ? `/takeoff/${site.id}`
            : `/landing/${site.id}`;

        return (
          <Marker
            key={`${site.type}-${site.id}`}
            position={[site.latitude, site.longitude]}
            icon={icon}
          >
            <Popup>
              <a href={link} className="text-blue-600 underline">
                {site.name} {site.wind && ` (${site.wind})`}
                <br />
                {site.altitude} m
              </a>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
