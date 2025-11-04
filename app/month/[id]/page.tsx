// app/month/[id]/page.tsx
import { notFound } from "next/navigation";
import MonthView from "./MonthView";
import { get_all_regions, get_country_by_id } from "@/app/api/get/get_places";

interface Params {
  params: { id: string };
}

export default async function MonthPage({ params }: Params) {
  const month = Number(params.id); // 1 - 12
  if (month < 1 || month > 12) return notFound();

  // 🔹 Definim sezoanele
  const seasons = [
    { id: 1, name: "Spring", months: [3, 4, 5] },
    { id: 2, name: "Summer", months: [6, 7, 8] },
    { id: 3, name: "Autumn", months: [9, 10, 11] },
    { id: 4, name: "Winter", months: [12, 1, 2] },
  ];

  const currentSeason = seasons.find(s => s.months.includes(month));
  if (!currentSeason) return notFound();

  // 🔹 1. Preluăm toate regiunile
  const regions = await get_all_regions();

  // 🔹 2. Filtrăm regiunile care au această lună în bestSeason
  const filteredRegions = regions.filter(r => r.bestSeason?.includes(month));

  // 🔹 3. Preluăm țările asociate (fără duplicate), filtrând null
  const countryPromises = filteredRegions.map(r => get_country_by_id({ id: r.countryId }));
  const countriesWithNulls = await Promise.all(countryPromises);

  // filtrăm doar țările valide
  const validCountries = countriesWithNulls.filter(
    (c): c is NonNullable<typeof c> => c !== null
  );

  // eliminăm duplicatele pe id
  const uniqueCountries = Array.from(
    new Map(validCountries.map(c => [c.id, c])).values()
  );

  return (
    <MonthView
      month={month}
      season={currentSeason}
      countrys={uniqueCountries}
      regions={filteredRegions}
    />
  );
}
