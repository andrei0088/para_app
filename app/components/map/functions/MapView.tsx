"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { Site } from "@/app/types";

type Community = {
  id: number;
  name: string;
  url: string;
  latitude: number;
  longitude: number;
};

interface MapProps {
  center: [number, number];
  takeoff?: Site[];
  landing?: Site[];
  zoom: number;
  community?: Community[];
}

export default function MapView({
  center,
  takeoff = [],
  landing = [],
  zoom,
  community,
}: MapProps) {
  const takeoffIcon = new L.Icon({
    iconUrl: "/icons/takeoff.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const landingIcon = new L.Icon({
    iconUrl: "/icons/landing.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const communityicon = new L.Icon({
    iconUrl: "/icons/community.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
  console.log({ community });
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {takeoff.map((site, i) => (
        <Marker
          key={`takeoff-${i}`}
          position={[site.latitude, site.longitude]}
          icon={takeoffIcon}
        >
          <Popup>
            {site.name ? (
              <Link href={`/takeoff/${site.id}`}>
                {site.name} {site.wind && `(${site.wind})`} - {site.altitude} m
              </Link>
            ) : (
              "Takeoff"
            )}
          </Popup>
        </Marker>
      ))}

      {landing.map((site, i) => (
        <Marker
          key={`landing-${i}`}
          position={[site.latitude, site.longitude]}
          icon={landingIcon}
        >
          <Popup>
            {site.name ? (
              <Link href={`/landing/${site.id}`}>{site.name}</Link>
            ) : (
              "Landing"
            )}
          </Popup>
        </Marker>
      ))}
      {community?.map((site, i) => (
        <Marker
          key={`community-${i}`}
          position={[site.latitude, site.longitude]}
          icon={communityicon}
        >
          <Popup>
            {site.name ? (
              <Link href={`/community/${site.url}`}>
                <span className="block text-center">
                  Community <br />
                  {site.name}
                </span>
              </Link>
            ) : (
              "Community"
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
