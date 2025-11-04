"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

interface Site {
    id : number;
  latitude: number;
  longitude: number;
  name?: string;
}

interface MapProps {
  center: [number, number];
  takeoff?: Site[];
  landing?: Site[];
  zoom:number;
}

export default function MapView({ center, takeoff = [], landing = [] , zoom}: MapProps) {
  const takeoffIcon = new L.Icon({
    iconUrl: "/icons/takeoff.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });

  const landingIcon = new L.Icon({
    iconUrl: "/icons/landing.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {takeoff.map((site, i) => (
        <Marker key={`takeoff-${i}`} position={[site.latitude, site.longitude]} icon={takeoffIcon}>
          <Popup>
            {site.name ? (
    <Link href={`/takeoff/${site.id}`}>{site.name}</Link>
  ) : (
    "Takeoff"
  )}
          </Popup>
        </Marker>
      ))}

      {landing.map((site, i) => (
        <Marker key={`landing-${i}`} position={[site.latitude, site.longitude]} icon={landingIcon}>
            <Popup>
                {site.name?(
                    <Link href={`/landing/${site.id}`}>{site.name}</Link>
                ):(
            
                     "Landing")}
            </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
