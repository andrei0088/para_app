import {
  get_all_country,
  get_all_regions,
  get_all_takeoff,
  get_all_landing,
} from "@/app/api/get/get_places";

import MapPageClient from "./MapPageClient";
import { Country, Region, Takeoff, Landing } from "@prisma/client";
import { Site } from "../types";

export default async function MapRutePage() {
  const countriesRaw = await get_all_country();
  const regionsRaw = await get_all_regions();
  const takeoffsRaw = await get_all_takeoff();
  const landingsRaw = await get_all_landing();

  // map null -> null (nu undefined)
  const countries: Country[] = countriesRaw.map((c) => ({
    ...c,
    description: c.description ?? null,
    latitude: c.latitude ?? null,
    longitude: c.longitude ?? null,
    seo: c.seo ?? null,
  }));

  const regions: Region[] = regionsRaw.map((r) => ({
    ...r,
    description: r.description ?? null,
    latitude: r.latitude ?? null,
    longitude: r.longitude ?? null,
    map: r.map ?? null,
    seo: r.seo ?? null,
    bestSeason: r.bestSeason ?? [],
  }));

  const takeoffs: Takeoff[] = takeoffsRaw.map((t) => ({
    ...t,
    description: t.description ?? null,
    wind: t.wind ?? null,
    map: t.map ?? null,
    seo: t.seo ?? null,
  }));

  const landings: Landing[] = landingsRaw.map((l) => ({
    ...l,
    description: l.description ?? null,
    map: l.map ?? null,
    seo: l.seo ?? null,
  }));

  const initialSites: Site[] = [
    ...takeoffs.map((t) => ({
      id: t.id,
      name: t.name,
      latitude: t.latitude,
      longitude: t.longitude,
      countryId: t.countryId,
      regionId: t.regionId,
      type: "takeoff" as const,
      map: t.map,
      seo: t.seo,
      wind: t.wind,
      altitude: t.altitude,
    })),
    ...landings.map((l) => ({
      id: l.id,
      name: l.name,
      latitude: l.latitude,
      longitude: l.longitude,
      countryId: l.countryId,
      regionId: l.regionId,
      type: "landing" as const,
      map: l.map,
      seo: l.seo,
      altitude: l.altitude,
    })),
  ];

  return (
    <MapPageClient
      countries={countries}
      regions={regions}
      takeoffs={takeoffs}
      landings={landings}
      initialSites={initialSites}
    />
  );
}
