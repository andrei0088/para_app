import Image from "next/image";
import bmap from "@/public/bigmap.jpg"

interface Id
{
    name : string
}
export default function EmaMap({name}:Id)
{

    return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">

    <Image
  src={name ? `/maps/${name}` : bmap}
    alt="Map"
    fill                
    style={{ objectFit: "cover" }} 
    priority
  />
  </div>
    );
}