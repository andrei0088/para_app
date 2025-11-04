import { get_all_country, get_all_regions } from "@/app/api/get/get_places";
import HomeForm from "./HomeForm";

export default async function SearchHome() {
  const countrys = await get_all_country();
  const regions = await get_all_regions();

  // 1️⃣ Obținem lunile unice
  const months: number[] = Array.from(
    new Set(regions.flatMap(r => r.bestSeason))
  ).sort((a, b) => a - b);

  // 2️⃣ Transformăm lunile în anotimpuri
  const seasonSet = new Set<number>();
  months.forEach((m) => {
    if ([3, 4, 5].includes(m)) seasonSet.add(1); // primavara
    else if ([6, 7, 8].includes(m)) seasonSet.add(2); // vara
    else if ([9, 10, 11].includes(m)) seasonSet.add(3); // toamna
    else if ([12, 1, 2].includes(m)) seasonSet.add(4); // iarna
  });

  const seasons = Array.from(seasonSet).sort((a, b) => a - b); // convertim în array pentru props

  return (
    <HomeForm
      countrys={countrys}
      regions={regions}
      seasons={seasons}
      months={months}
    />
  );
}
