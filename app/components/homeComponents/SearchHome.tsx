import { get_all_country, get_all_regions } from "@/app/api/get/get_places";
import HomeForm from "./HomeForm";

export default async function SearchHome() {
  // 1️⃣ Fetch paralel pentru performanță
  const [countrys, regions] = await Promise.all([
    get_all_country(),
    get_all_regions(),
  ]);

  // 2️⃣ Obținem lunile unice direct într-un Set
  const monthsSet = new Set<number>();
  regions.forEach((r) => {
    r.bestSeason?.forEach((m) => monthsSet.add(m));
  });
  const months = Array.from(monthsSet).sort((a, b) => a - b);

  // 3️⃣ Transformăm lunile în anotimpuri folosind Map pentru lookup rapid
  const monthToSeasonMap: Record<number, number> = {
    12: 4,
    1: 4,
    2: 4, // iarna
    3: 1,
    4: 1,
    5: 1, // primavara
    6: 2,
    7: 2,
    8: 2, // vara
    9: 3,
    10: 3,
    11: 3, // toamna
  };

  const seasonsSet = new Set<number>();
  months.forEach((m) => {
    const season = monthToSeasonMap[m];
    if (season) seasonsSet.add(season);
  });
  const seasons = Array.from(seasonsSet).sort((a, b) => a - b);

  // 4️⃣ Returnăm componentei HomeForm
  return (
    <HomeForm
      countrys={countrys}
      regions={regions}
      seasons={seasons}
      months={months}
    />
  );
}
