import { get_all_country, get_all_regions } from "@/app/api/get/get_places";
import SearchElement from "./SearchElement";
import type { Select, Region, Country } from "@/app/types";

interface SearchFormProps {
  select: Select;
}

export default async function SearchForm({ select }: SearchFormProps) {
  // Fetch countries
  const countrysFromApi = await get_all_country();
  const countrys: Country[] = countrysFromApi.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description ?? undefined,
    latitude: c.latitude ?? undefined,
    longitude: c.longitude ?? undefined,
  }));

  // Fetch regions
  const regionsFromApi = await get_all_regions();
  const regions: Region[] = regionsFromApi.map((r) => ({
    id: r.id,
    name: r.name,
    countryId: r.countryId,
    description: r.description ?? undefined,
    latitude: r.latitude ?? undefined,
    longitude: r.longitude ?? undefined,
    bestSeason: r.bestSeason ?? undefined,
    map: r.map ?? undefined,
  }));

  return (
    <SearchElement
      countrys={countrys}
      regions={regions}
      select={select}
    />
  );
}
