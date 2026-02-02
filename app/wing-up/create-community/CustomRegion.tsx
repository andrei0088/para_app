import { country_custom } from "./action";
import CustomRegionClient from "./CustomRegionClient";

export default async function CustomRegion() {
  const country = await country_custom();
  return <CustomRegionClient country={country} />;
}
