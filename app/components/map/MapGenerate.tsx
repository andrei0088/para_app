import MidleMapHandler from "./functions/MidleMapHandler";
import { get_all_takeoff, get_all_landing } from "@/app/api/get/get_places";

interface MapGenerateProps {
  center: [number, number];
  zoom?: number;
}

export default async function MapGenerate({ center , zoom }: MapGenerateProps) { 
    const takeoff = await get_all_takeoff();
    const landing = await get_all_landing();


    return <MidleMapHandler
            center={center}
            zoom={zoom}
            takeoff={takeoff}
            landing={landing} />
}