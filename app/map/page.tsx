import {
  get_all_country,
  get_all_regions,
  get_all_takeoff,
  get_all_landing,
} from "@/app/api/get/get_places";
import calculateGPSCenter from "@/app/components/map/functions/calculateGPSCenter";
import MapPageClient from "./MapPageClient";
import { Site, Country, Region } from "../types";

// sanitize helper
function sanitizeCountry(c: {
  id: number;
  name: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
}): Country {
  return {
    id: c.id,
    name: c.name,
    description: c.description ?? undefined,
  };
}

function sanitizeRegion(r: {
  id: number;
  name: string;
  countryId: number;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  bestSeason?: number[] | null;
}): Region {
  return {
    id: r.id,
    name: r.name,
    countryId: r.countryId,
    description: r.description ?? undefined,
    bestSeason: r.bestSeason ?? undefined,
  };
}

export default async function MapRutePage({
  searchParams,
}: {
  searchParams?: { country?: string; region?: string };
}) {
  const countriesRaw = await get_all_country();
  const regionsRaw = await get_all_regions();
  const takeoffs = await get_all_takeoff();
  const landings = await get_all_landing();

  const countries: Country[] = countriesRaw.map(sanitizeCountry);
  const regions: Region[] = regionsRaw.map(sanitizeRegion);

  const takeoffSites: Site[] = takeoffs.map((t) => ({
    id: t.id,
    name: t.name,
    latitude: t.latitude,
    longitude: t.longitude,
    countryId:
      t.countryId ?? regions.find((r) => r.id === t.regionId)?.countryId ?? 0,
    regionId: t.regionId,
    type: "takeoff",
  }));

  const landingSites: Site[] = landings.map((l) => ({
    id: l.id,
    name: l.name,
    latitude: l.latitude,
    longitude: l.longitude,
    countryId:
      l.countryId ?? regions.find((r) => r.id === l.regionId)?.countryId ?? 0,
    regionId: l.regionId,
    type: "landing",
  }));

  const initialSites: Site[] = [...takeoffSites, ...landingSites];
  const initialCenter = calculateGPSCenter(initialSites);

  const selectedCountryId = searchParams?.country
    ? parseInt(searchParams.country)
    : null;
  const selectedRegionId = searchParams?.region
    ? parseInt(searchParams.region)
    : null;

  return (
    <MapPageClient
      countries={countries}
      regions={regions}
      initialSites={initialSites}
      initialCenter={initialCenter}
      defaultSelected={{
        countryId: selectedCountryId,
        regionId: selectedRegionId,
      }}
    />
  );
}
