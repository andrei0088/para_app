import { get_all_country, get_all_regions } from "@/app/api/get/get_places";
import SearchElement from "./SearchElement";
import type { Select, Region, Country } from "@/app/types";

interface SearchFormProps {
  select: Select;
}

export default async function SearchForm({ select }: SearchFormProps) {
  // Prisma rulează doar aici (server)
  const countrysFromApi = await get_all_country();
  const countrys: Country[] = countrysFromApi.map((c) => ({
    ...c,
    description: c.description ?? "", // fallback
  }));

  const regionsFromApi = await get_all_regions();
  const regions: Region[] = regionsFromApi.map((r) => ({
    ...r,
    description: r.description ?? "", // fallback
  }));

  // Transmitem tot la client
  return (
    <SearchElement
      countrys={countrys}
      regions={regions}
      select={select}
    />
  );
}
