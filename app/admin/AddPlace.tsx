import AddNewPlace from "./AddNewPlace";
import { get_country_region_all } from "./lib/admin";

export default async function AddPlacePage() {
  const data = await get_country_region_all()
  if(data.succes)  return <AddNewPlace countries={data.rez.country} regions={data.rez.region} />;
  return "Database error !";
}
