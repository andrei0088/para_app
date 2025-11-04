import AddNewPlace from "./AddNewPlace";
import { get_all_country, get_all_regions } from "@/app/api/get/get_places";

export default async function AddPlacePage() {
  const countries = await get_all_country();
  const regions = await get_all_regions();

  return <AddNewPlace countries={countries} regions={regions} />;
}
