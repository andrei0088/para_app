import { get_country_by_id, get_region_landings_takeoffs, get_regions_by_id } from "@/app/api/get/get_places";
import { notFound } from "next/navigation";
import SearchForm from "@/app/search/SearchForm";
import ViewRegion from "./ViewRegion";
import SocialComponent from "@/app/components/social/SocialComponent";

export default async function Region({ params }: { params: { id: string } }) {
  const id =  Number( params.id);

  const region = await get_regions_by_id({ id });
  if (!region) return notFound();

  const country = await get_country_by_id({ id: region.countryId });
  if (!country) return notFound();

  const sites = await get_region_landings_takeoffs({ id });

  const fallbackDescription = `
  <p class="text-xl font-semibold">
    Explore this amazing region!
  </p>
  <p>
    This page is under development, but soon you’ll find detailed insights about paragliding spots, takeoff and landing locations, ideal flying seasons, and safety tips specific to this region.
  </p>
  <p>
    Our aim is to guide pilots and adventure seekers to discover the most scenic mountains and valleys for safe and unforgettable flights.
  </p>
  <p class="italic text-blue-700 dark:text-blue-400 font-medium">
    Stay tuned for updates and start planning your next paragliding adventure here!
  </p>
`;



  return (
    <div>
      {/* Transformăm region într-un array pentru select */}
<SearchForm select={{ country, region: [{ ...region, description: undefined }] }} />

      <ViewRegion
        country={country} // nu modificăm obiectul, lăsăm ViewRegion să facă fallback
        region={{ ...region, description: region.description ?? fallbackDescription }}
        takeoff={sites.takeoff.map(t => ({ ...t, description: undefined }))}
        landing={sites.landing.map(l => ({ ...l, description: undefined }))}
      />
      <SocialComponent selectedTipe={"r"} selectedName={region.name} selectedId={id}/>
    </div>
  );
}
