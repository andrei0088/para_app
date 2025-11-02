// app/admin/editplace/page.tsx
import EditPlaceForm from "./EditPlaceForm";
import {
  get_country_by_id,
  get_regions_by_id,
  get_takeoff_by_id,
  get_landing_by_id,
  get_all_regions,
  get_all_country,
} from "@/app/api/get/get_places";
import { BasePlace, Country, Region, PlaceType } from "@/app/types";

interface Props {
  searchParams: { type?: string; id?: string };
}

// Helper to convert null => undefined
function sanitizePlace<T extends Record<string, unknown>>(data: T): BasePlace {
  return {
    id: typeof data.id === "number" ? data.id : 0,
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : undefined,
    latitude: typeof data.latitude === "number" ? data.latitude : undefined,
    longitude: typeof data.longitude === "number" ? data.longitude : undefined,
    countryId: typeof data.countryId === "number" ? data.countryId : undefined,
    regionId: typeof data.regionId === "number" ? data.regionId : undefined,
    bestSeason: Array.isArray(data.bestSeason) ? data.bestSeason.map(Number) : undefined,
    map: typeof data["map"] === "string" ? data["map"] : undefined,
    altitude: typeof data["altitude"] === "number" ? data["altitude"] : undefined,
  };
}

export default async function EditPlacePage({ searchParams }: Props) {
  const typeParam = searchParams.type as PlaceType | undefined;
  const id = searchParams.id ? Number(searchParams.id) : undefined;

  if (!typeParam || !id) return <p>Invalid parameters.</p>;

  let data: Record<string, unknown> | null = null;

  switch (typeParam) {
    case "country":
      data = await get_country_by_id({ id });
      break;
    case "region":
      data = await get_regions_by_id({ id });
      break;
    case "takeoff":
      data = await get_takeoff_by_id({ id });
      break;
    case "landing":
      data = await get_landing_by_id({ id });
      break;
    default:
      return <p>Invalid type.</p>;
  }

  if (!data) return <p>Not found.</p>;

  const sanitizedData = sanitizePlace(data);

  const countries: Country[] = await get_all_country();
  const regions: Region[] = await get_all_regions();

  return (
    <EditPlaceForm
      type={typeParam}
      initialData={sanitizedData}
      countries={countries}
      regions={regions}
    />
  );
}
