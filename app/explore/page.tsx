import { get_all_country, get_all_regions } from "../api/get/get_places";
import ExploreClient from "./ExploreClient";

export default async function ExplorePage() {
  const countrys = await get_all_country();
  const regions = await get_all_regions();

  return <ExploreClient countrys={countrys} regions={regions} />;
}
