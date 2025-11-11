import React from "react";
import TopView from "@/app/components/dinamic/TopView";
import RegionsView from "./RegionsView";
import JoinView from "@/app/components/dinamic/JoinView";
import ViewOnMap from "@/app/components/dinamic/ViewOnMap";
import MapList from "./MapList";
import Sesons from "./Sesons";
import { get_country_maps } from "./function"; // doar funcția, fără tipuri

// Tipuri pentru sezoane
interface Season {
  name: string;
  emoji: string;
  months: number[];
}

// Tipuri pentru regiuni
interface Region {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[];
  description?: string;
  map?: string;
  takeoffs?: { regionId: number }[];
  landings?: { regionId: number }[];
}

// Tipuri pentru site-uri
interface Sites {
  takeoff: { regionId: number }[];
  landing: { regionId: number }[];
}

// Tipuri pentru hărți (MapList)
interface RegionMap {
  id: number;
  name: string;
  map: string;
}

// Props componentă
interface LeftCountryProps {
  countryName: string;
  countryId: number;
  regions: Region[];
  sites: Sites;
  seasons: Season[];
  months: number[];
}

const LeftCountry = async ({
  countryName,
  countryId,
  regions,
  sites,
  seasons,
  months,
}: LeftCountryProps) => {
  // Obținem hărțile țării și filtrăm pe cele care au map valid
  const maps: RegionMap[] = (await get_country_maps(countryId)).filter(
    (m) => m.map !== null
  ) as RegionMap[];

  return (
    <div className="w-full md:w-3/7 p-4 relative ">
      {/* Sezoane */}
      <Sesons seasons={seasons} months={months} />

      {/* Vizualizare top */}
      <TopView component="c" id={countryId} />

      {/* Lista regiunilor */}
      <RegionsView regions={regions} sites={sites} />

      {/* Join / call to action */}
      <JoinView />

      {/* Vezi pe hartă */}
      <ViewOnMap country={countryId} region={""} name={countryName} />

      {/* Galerie hărți */}
      <MapList maps={maps} />

      {/* Linie verticală gradient */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-0.5 bg-linear-to-b from-gray-100 via-cyan-500 to-gray-200"></div>
    </div>
  );
};

export default LeftCountry;
