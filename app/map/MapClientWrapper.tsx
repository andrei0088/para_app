"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import calculateGPSCenter from "@/app/components/map/functions/calculateGPSCenter";
import { Site } from "../types";

const MapView = dynamic(() => import("./MapView"), { ssr: false });



interface Props {
  allSites: Site[];
  initialCenter: [number, number];
  selected: { countryId: number | null; regionId: number | null };
}

export default function MapClientWrapper({ allSites, initialCenter, selected }: Props) {
  const [center, setCenter] = useState(initialCenter);

  useEffect(() => {
    let filteredSites = allSites;

    // dacă există țară, recentrează pe locurile din țara respectivă
    if (selected.countryId) {
      filteredSites = filteredSites.filter(s => s.countryId === selected.countryId);
    }

    // dacă există regiune, recentrează pe locurile din regiune
    if (selected.regionId) {
      filteredSites = filteredSites.filter(s => s.regionId === selected.regionId);
    }

    // calculează centrul doar pe baza selecției
    if (filteredSites.length) {
      setCenter(calculateGPSCenter(filteredSites));
    } else {
      setCenter(initialCenter); // fallback pe toate locurile
    }
  }, [selected, allSites, initialCenter]);

  return <MapView allSites={allSites} center={center} />;
}
