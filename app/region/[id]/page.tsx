import {
  get_country_by_id,
  get_region_landings_takeoffs,
  get_regions_by_id,
} from "@/app/api/get/get_places";
import { notFound } from "next/navigation";
import SearchForm from "@/app/search/SearchForm";
import ViewRegion from "./ViewRegion";
import SocialComponent from "@/app/components/social/SocialComponent";
import LeftRegion from "./LeftRegion";
import SEO from "@/app/components/Seo";
import Link from "next/link";

// ------------- TIPURI LOCALE ----------------
interface Takeoff {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  regionId: number;
  countryId: number;
  description?: string;
  map?: string;
}

interface Landing {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  regionId: number;
  countryId: number;
  description?: string;
  map?: string;
}

interface Region {
  id: number;
  name: string;
  countryId: number;
  description?: string;
  map?: string;
  seo?: string;
  bestSeason: number[];
  takeoffs: Takeoff[];
  landings: Landing[];
}

interface Country {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  description?: string;
}

// ------------- TIPURI RAW API ----------------
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
  latitude: number | null;
  longitude: number | null;
  altitude: number;
  regionId: number;
  countryId: number;
  description?: string | null;
  map?: string | null;
}

interface LandingRaw {
  id: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
  altitude: number;
  regionId: number;
  countryId: number;
  description?: string | null;
  map?: string | null;
}

// ------------- NORMALIZARE ------------------
const normalizeSite = (site: TakeoffRaw | LandingRaw): Takeoff | Landing => ({
  id: site.id,
  name: site.name,
  latitude: site.latitude ?? 0,
  longitude: site.longitude ?? 0,
  altitude: site.altitude,
  regionId: site.regionId,
  countryId: site.countryId,
  description: site.description ?? undefined,
  map: site.map ?? undefined,
});

// ------------- COMPONENTA ------------------
export default async function RegionPage({
  params,
}: {
  params: { id: string };
}) {
  const para = await params;
  const id = Number(para.id);
  if (isNaN(id)) return notFound();

  const regionRaw: RegionRaw | null = await get_regions_by_id({ id });
  if (!regionRaw) return notFound();

  const countryRaw = await get_country_by_id({ id: regionRaw.countryId });
  if (!countryRaw) return notFound();

  const sitesRaw = (await get_region_landings_takeoffs({ id })) ?? {
    takeoff: [],
    landing: [],
  };

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
    description: regionRaw.description ?? undefined,
    map: regionRaw.map ?? undefined,
    seo: regionRaw.seo ?? undefined,
    bestSeason: regionRaw.bestSeason ?? [],
    takeoffs: (regionRaw.takeoffs ?? []).map(normalizeSite) as Takeoff[],
    landings: (regionRaw.landings ?? []).map(normalizeSite) as Landing[],
  };

  const takeoff: Takeoff[] = (sitesRaw.takeoff ?? []).map(
    normalizeSite
  ) as Takeoff[];
  const landing: Landing[] = (sitesRaw.landing ?? []).map(
    normalizeSite
  ) as Landing[];

  const fallbackDescription = `
    <p class="text-xl font-semibold">Explore this amazing region!</p>
    <p>
      This page is under development, but soon you’ll find detailed insights about paragliding spots, takeoff and landing locations, ideal flying seasons, and safety tips specific to this region.
    </p>
    <p class="italic text-blue-700  font-medium">
      Stay tuned for updates and start planning your next paragliding adventure here!
    </p>
  `;

  return (
    <div className="mb-2 dark:text-gray-800">
      <SEO title={region.name} description={region.seo} />
      <SearchForm select={{ country, region: [region] }} />

      <div className="w-full xl:max-w-7xl mx-auto bg-gray-50 rounded-2xl shadow-lg mt-2 pt-2">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-300 pb-3 px-6 tracking-wide leading-snug">
          <Link
            href={`/country/${country.id}`}
            className="hover:text-green-900 transition-colors duration-300"
          >
            {country.name}
          </Link>{" "}
          /{" "}
          <Link
            href={`/country/${region.id}`}
            className="hover:text-green-900 transition-colors duration-300"
          >
            {region.name}
          </Link>
        </h1>

        <div className="flex md:flex-row flex-col-reverse gap-4">
          <LeftRegion region={region} takeoff={takeoff} landing={landing} />
          <ViewRegion
            country={country}
            region={{
              ...region,
              description: region.description ?? fallbackDescription,
            }}
            takeoff={takeoff}
            landing={landing}
          />
        </div>

        <div className="w-full h-1 rounded-full bg-linear-to-r from-cyan-50 via-black to-cyan-50 blur-[0.3px]" />
        <SocialComponent
          selectedTipe="r"
          selectedName={region.name}
          selectedId={id}
        />
      </div>
    </div>
  );
}
