import { 
  get_all_regions_with_sites, 
  get_country_by_id, 
  get_landing_by_id, 
  get_regions_by_id, 
  get_takeoff_by_id 
} from "./get_places";

interface Country {
  id: number;
  name: string;
  description?: string | null;
}

interface Region {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[];
  description?: string | null;
  map?:string | null;
}

interface Details {
  country: Country;
  region: Region;
}

// ============================================
// Get Takeoff Details
export async function get_takoff_details({ id }: { id: number }): Promise<Details | null> {
  const takeoff = await get_takeoff_by_id({ id });
  if (!takeoff) return null;

  const country = await get_country_by_id({ id: takeoff.countryId });
  const region = await get_regions_by_id({ id: takeoff.regionId });

  if (!country || !region) return null;

  return { country, region };
}

// ============================================
// Get Landing Details
export async function get_landing_details({ id }: { id: number }): Promise<Details | null> {
  const landing = await get_landing_by_id({ id });
  if (!landing) return null;

  const country = await get_country_by_id({ id: landing.countryId });
  const region = await get_regions_by_id({ id: landing.regionId });

  if (!country || !region) return null;

  return { country, region };
}

// ============================================
// Get Regions by Season
export async function get_regions_by_season({ id }: { id: number }): Promise<Region[]> {
  if (id < 1 || id > 4) throw new Error("invalid input");

  const regions = await get_all_regions_with_sites();
  const seasonMonths: Record<number, number[]> = {
    1: [3, 4, 5],    // Spring
    2: [6, 7, 8],    // Summer
    3: [9, 10, 11],  // Autumn
    4: [12, 1, 2]    // Winter
  };

  const months = seasonMonths[id];

  return regions.filter((r) => r.bestSeason?.some((m) => months.includes(m)) ?? false);
}


export async function get_regions_by_month({ id }: { id: number }): Promise<Region[]> {
  if (id < 1 || id > 12) throw new Error("Invalid month id, must be 1-12");

  const regions = await get_all_regions_with_sites();

  // filtrăm regiunile unde bestSeason include luna
  return regions.filter((r) => r.bestSeason?.includes(id) ?? false);
}