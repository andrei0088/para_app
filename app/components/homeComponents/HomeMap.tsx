import calculateGPSCenter from "../map/functions/calculateGPSCenter";
import { get_all_takeoff, get_all_landing } from "@/app/api/get/get_places";
import MapGenerate from "../map/MapGenerate";


export default async function HomeMap() {

  const takeoff = await get_all_takeoff();
  const landing = await get_all_landing();

  const center = calculateGPSCenter([...takeoff, ...landing]);

  return (
      <MapGenerate center={center} />
  );
}
