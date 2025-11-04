import { get_takeoff_by_id, get_region_landings_takeoffs } from "@/app/api/get/get_places";
import { get_takoff_details } from "@/app/api/get/get_details";
import ViewTakeoff from "./ViewTakeoff";
import TakeoffDetails from "./TakeoffDetails";
import SocialComponent from "@/app/components/social/SocialComponent";

interface PageProps {
  params: { id: string };
}


export default async function TakeoffPage({ params }: PageProps) {
  const id = Number(params.id);

  // 1️⃣ Preluare takeoff
  const takeoff = await get_takeoff_by_id({ id });
  if (!takeoff) {
    return <p className="text-center text-gray-500 mt-10">Takeoff not found.</p>;
  }

  // 2️⃣ Preluare detalii
  const rawDetail = await get_takoff_details({ id });
  if (!rawDetail || !rawDetail.region || !rawDetail.country) {
    return <p className="text-center text-gray-500 mt-10">Takeoff details not found.</p>;
  }

  // ⚡ Normalizare tipuri
  const detail = {
    country: {
      id: rawDetail.country.id,
      name: rawDetail.country.name,
    },
    region: {
      id: rawDetail.region.id,
      name: rawDetail.region.name,
      bestSeason: rawDetail.region.bestSeason ?? [],
    },
  };

  // 4️⃣ Preluare site-uri
  const sites = await get_region_landings_takeoffs({ id: rawDetail.region.id });

  // 5️⃣ Fallback descriere takeoff
  const takeoffDescriptionFallback = `
  <p class="text-xl font-semibold">
    Discover this amazing takeoff spot!
  </p>
  <p>
    Detailed information about this takeoff, its ideal flying conditions, nearby landing sites, and safety tips will be available soon.
  </p>
  <p>
    Our goal is to help pilots and adventure seekers plan safe and unforgettable flights from this location.
  </p>
  <p class="italic text-blue-700 dark:text-blue-400 font-medium">
    Stay tuned for full updates and start preparing for your next paragliding adventure!
  </p>
`;


  // 6️⃣ Creăm obiectul final takeoff
  const takeoffWithDescription = {
    ...takeoff,
    description: takeoff.description ?? takeoffDescriptionFallback,
  };

  return (
    <div className="space-y-4">
      <TakeoffDetails details={detail} sites={sites} />
      <ViewTakeoff takeoff={takeoffWithDescription} details={detail} />
      <SocialComponent selectedTipe={"t"} selectedName={takeoff.name} selectedId={id} />
    </div>
  );
}
