import MidleMapHandler from "./functions/MidleMapHandler";
import { get_all_takeoff, get_all_landing } from "@/app/api/get/get_places";

interface MapGenerateProps {
<<<<<<< HEAD
  center?: [number, number]; 
  zoom?: number;
}

export default async function MapGenerate({ center, zoom }: MapGenerateProps) { 
    const takeoff = await get_all_takeoff();
    const landing = await get_all_landing();
  
    // dacă center nu este trimis → se folosește centrul implicit
    const defaultCenter: [number, number] = [46.577,9.975]; 
    const mapCenter = center ?? defaultCenter;

    return (
      <MidleMapHandler
        center={mapCenter}
        zoom={zoom}
        takeoff={takeoff}
        landing={landing}
      />
    );
}
=======
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
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
