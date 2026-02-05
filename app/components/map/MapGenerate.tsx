import MidleMapHandler from "./functions/MidleMapHandler";
import {
  get_all_takeoff,
  get_all_landing,
  get_all_community,
} from "@/app/api/get/get_places";

interface MapGenerateProps {
  center?: [number, number];
  zoom?: number;
}

export default async function MapGenerate({ center, zoom }: MapGenerateProps) {
  const takeoff = await get_all_takeoff();
  const landing = await get_all_landing();
  const community = await get_all_community();

  // dacă center nu este trimis → se folosește centrul implicit
  const defaultCenter: [number, number] = [46.577, 9.975];
  const mapCenter = center ?? defaultCenter;
  return (
    <MidleMapHandler
      center={mapCenter}
      zoom={zoom}
      takeoff={takeoff}
      landing={landing}
      community={community}
    />
  );
}
