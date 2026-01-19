import { notFound } from "next/navigation";
import SeasonView from "./SesonView";
import { get_all_regions, get_country_by_id } from "@/app/api/get/get_places";

interface Params {
  params: { id: string };
}

// ---------------- TIPURI LOCALE ----------------
interface Takeoff {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  regionId: number;
  countryId: number;
  map?: string;
  description?: string;
}

interface Landing {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  regionId: number;
  countryId: number;
  map?: string;
  description?: string;
}

interface Region {
  id: number;
  name: string;
  countryId: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  map?: string;
  seo?: string;
  bestSeason?: number[];
  takeoffs?: Takeoff[];
  landings?: Landing[];
}

interface Country {
  id: number;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  seo?: string;
}

interface Season {
  id: number;
  name: string;
  months: number[];
}

// ---------------- API TIPURI ----------------
interface ApiRegionRaw {
  id: number;
  name: string;
  countryId: number;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  seo: string | null;
  map: string | null;
  bestSeason: number[] | null;
  takeoffs: { id: number }[];
  landings: { id: number }[];
}

interface ApiCountry {
  id: number;
  name: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  seo: string | null;
  image: string | null;
  comments: string[];
}

// ---------------- SEZONALE ----------------
const seasons: Season[] = [
  { id: 1, name: "Spring", months: [3, 4, 5] },
  { id: 2, name: "Summer", months: [6, 7, 8] },
  { id: 3, name: "Autumn", months: [9, 10, 11] },
  { id: 4, name: "Winter", months: [12, 1, 2] },
];

// ---------------- NORMALIZARE ----------------
function normalizeRegion(r: ApiRegionRaw): Region {
  return {
    id: r.id,
    name: r.name,
    countryId: r.countryId,
    description: r.description ?? undefined,
    latitude: r.latitude ?? undefined,
    longitude: r.longitude ?? undefined,
    map: r.map ?? undefined,
    seo: r.seo ?? undefined,
    bestSeason: r.bestSeason ?? undefined,
    takeoffs: r.takeoffs?.map((t) => ({
      id: t.id,
      name: "Unknown takeoff",
      latitude: 0,
      longitude: 0,
      altitude: 0,
      regionId: r.id,
      countryId: r.countryId,
    })),
    landings: r.landings?.map((l) => ({
      id: l.id,
      name: "Unknown landing",
      latitude: 0,
      longitude: 0,
      altitude: 0,
      regionId: r.id,
      countryId: r.countryId,
    })),
  };
}

function normalizeCountry(c: ApiCountry): Country {
  return {
    id: c.id,
    name: c.name,
    description: c.description ?? undefined,
    latitude: c.latitude ?? undefined,
    longitude: c.longitude ?? undefined,
    seo: c.seo ?? undefined,
  };
}

// ---------------- COMPONENTA ----------------
export default async function SeasonsPage({ params }: Params) {
  const para = await params;
  const seasonId = Number(para.id);
  const season = seasons.find((s) => s.id === seasonId);
  if (!season) return notFound();

  // 1️⃣ Preluăm toate regiunile
  const regionsFromApi: ApiRegionRaw[] = await get_all_regions();

  // 2️⃣ Normalizăm regiunile
  const regions = regionsFromApi.map(normalizeRegion);

  // 3️⃣ Filtrăm regiunile după sezon
  const filteredRegions = regions.filter((r) =>
    r.bestSeason?.some((month) => season.months.includes(month))
  );

  // 4️⃣ Preluăm țările asociate
  const countriesRaw = await Promise.all(
    filteredRegions.map((r) => get_country_by_id({ id: r.countryId }))
  );

  // 5️⃣ Normalizăm și filtrăm țările
  const validCountries: Country[] = countriesRaw
    // ✅ predicate corect tipat
    .filter((c): c is ApiCountry & { seo?: string | null } => c != null)
    .map(normalizeCountry);

  // 6️⃣ Eliminăm duplicatele
  const uniqueCountries = Array.from(
    new Map(validCountries.map((c) => [c.id, c])).values()
  );

  return (
    <SeasonView
      season={seasonId}
      regions={filteredRegions}
      countrys={uniqueCountries}
    />
  );
}
