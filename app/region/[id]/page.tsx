import { get_country_by_id, get_region_landings_takeoffs, get_regions_by_id } from "@/app/api/get/get_places";
import { notFound } from "next/navigation";
import SearchForm from "@/app/search/SearchForm";
import ViewRegion from "./ViewRegion";
import SocialComponent from "@/app/components/social/SocialComponent";
import type { Country, Region, Takeoff, Landing } from "@/app/types";

// Tipuri brute API pentru regiune
interface RegionRaw {
  id: number;
  name: string;
  countryId: number;
  description?: string | null;
  bestSeason?: number[] | null;
  map?: string | null;
  seo?: string | null;
  takeoffs?: TakeoffRaw[] | null;
  landings?: LandingRaw[] | null;
}

interface TakeoffRaw {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  description?: string | null;
  regionId: number;
  countryId: number;
  map?: string | null;
}

interface LandingRaw {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  description?: string | null;
  regionId: number;
  countryId: number;
  map?: string | null;
}

interface LandingTakeoff {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  description?: string;
  map?: string;
  regionId?: number;
  countryId?: number;
}

export default async function Region({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const regionRaw: RegionRaw | null = await get_regions_by_id({ id });
  if (!regionRaw) return notFound();

  const countryRaw = await get_country_by_id({ id: regionRaw.countryId });
  if (!countryRaw) return notFound();

  const sitesRaw = await get_region_landings_takeoffs({ id }) ?? { takeoff: [], landing: [] };

  // Normalizează țara
  const country: Country = {
    id: countryRaw.id,
    name: countryRaw.name,
    latitude: countryRaw.latitude ?? undefined,
    longitude: countryRaw.longitude ?? undefined,
    description: countryRaw.description ?? undefined,
  };

  // Normalizează regiunea
  const region: Region = {
    id: regionRaw.id,
    name: regionRaw.name,
    countryId: regionRaw.countryId,
    map: regionRaw.map ?? undefined,
    seo: regionRaw.seo ?? undefined,
    description: regionRaw.description ?? undefined,
    bestSeason: regionRaw.bestSeason ?? undefined,
    takeoffs: (regionRaw.takeoffs ?? []).map((t: TakeoffRaw): Takeoff => ({
      id: t.id,
      name: t.name,
      regionId: t.regionId,
      latitude: t.latitude,
      longitude: t.longitude,
      map: t.map ?? undefined,
    })),
    landings: (regionRaw.landings ?? []).map((l: LandingRaw): Landing => ({
      id: l.id,
      name: l.name,
      regionId: l.regionId,
      latitude: l.latitude,
      longitude: l.longitude,
      map: l.map ?? undefined,
    })),
  };

  // Normalizează site-urile de tip takeoff/landing
  const takeoff: LandingTakeoff[] = (sitesRaw.takeoff ?? []).map((t: TakeoffRaw) => ({
    id: t.id,
    name: t.name,
    altitude: t.altitude,
    latitude: t.latitude ?? undefined,
    longitude: t.longitude ?? undefined,
    description: t.description ?? undefined,
    map: t.map ?? undefined,
    regionId: t.regionId,
    countryId: t.countryId,
  }));

  const landing: LandingTakeoff[] = (sitesRaw.landing ?? []).map((l: LandingRaw) => ({
    id: l.id,
    name: l.name,
    altitude: l.altitude,
    latitude: l.latitude ?? undefined,
    longitude: l.longitude ?? undefined,
    description: l.description ?? undefined,
    map: l.map ?? undefined,
    regionId: l.regionId,
    countryId: l.countryId,
  }));

  const fallbackDescription = `
    <p class="text-xl font-semibold">Explore this amazing region!</p>
    <p>
      This page is under development, but soon you’ll find detailed insights about paragliding spots, takeoff and landing locations, ideal flying seasons, and safety tips specific to this region.
    </p>
    <p class="italic text-blue-700 dark:text-blue-400 font-medium">
      Stay tuned for updates and start planning your next paragliding adventure here!
    </p>
  `;

  return (
    <div className="space-y-6 p-6">
      <SearchForm select={{ country, region: [region] }} />
      <ViewRegion
        country={country}
        region={{ ...region, description: region.description ?? fallbackDescription }}
        takeoff={takeoff}
        landing={landing}
      />
      <SocialComponent selectedTipe="r" selectedName={region.name} selectedId={id} />
    </div>
  );
}
