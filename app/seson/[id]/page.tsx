import { notFound } from "next/navigation";
import SeasonView from "./SesonView";
import { get_all_regions, get_country_by_id } from "@/app/api/get/get_places";
<<<<<<< HEAD
import type { Country, Region } from "@/app/types";
=======
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

interface Params {
  params: { id: string };
}

export default async function SeasonsPage({ params }: Params) {
  const seasonId = Number(params.id);

  const seasons = [
    { id: 1, name: "Spring", months: [3, 4, 5] },
    { id: 2, name: "Summer", months: [6, 7, 8] },
    { id: 3, name: "Autumn", months: [9, 10, 11] },
    { id: 4, name: "Winter", months: [12, 1, 2] },
  ];

  const season = seasons.find(s => s.id === seasonId);
  if (!season) return notFound();

  // 1️⃣ Preluăm toate regiunile
<<<<<<< HEAD
  const regionsFromApi = await get_all_regions();

  // 2️⃣ Filtrăm regiunile care au cel puțin o lună din sezon
  const filteredRegions: Region[] = regionsFromApi
    .filter(r => r.bestSeason?.some(month => season.months.includes(month)))
    .map(r => ({
      ...r,
      description: r.description ?? undefined,
      latitude: r.latitude ?? undefined,
      longitude: r.longitude ?? undefined,
      map: r.map ?? undefined,
      bestSeason: r.bestSeason ?? undefined,
    }));
=======
  const regions = await get_all_regions();

  // 2️⃣ Filtrăm regiunile care au cel puțin o lună din sezon
  const filteredRegions = regions
  .filter(r => r.bestSeason?.some(month => season.months.includes(month)))
  .map(r => ({
    ...r,
    description: r.description ?? undefined, // convertim null -> undefined
  }));
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

  // 3️⃣ Preluăm țările asociate (fără duplicate), filtrăm null
  const countryPromises = filteredRegions.map(r => get_country_by_id({ id: r.countryId }));
  const countriesWithNulls = await Promise.all(countryPromises);
<<<<<<< HEAD
  const validCountries: Country[] = countriesWithNulls
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .map(c => ({
      ...c,
      description: c.description ?? undefined,
      latitude: c.latitude ?? undefined,
      longitude: c.longitude ?? undefined,
    }));

  const uniqueCountries = Array.from(new Map(validCountries.map(c => [c.id, c])).values());
=======
  const validCountries = countriesWithNulls.filter(
    (c): c is NonNullable<typeof c> => c !== null
  );

  const uniqueCountries = Array.from(
    new Map(validCountries.map(c => [c.id, c])).values()
  );

  

>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

  return (
    <SeasonView
      season={seasonId}
      countrys={uniqueCountries}
      regions={filteredRegions}
    />
  );
}
