<<<<<<< HEAD
// app/region/[id]/page.tsx
=======
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
import { get_country_by_id, get_region_landings_takeoffs, get_regions_by_id } from "@/app/api/get/get_places";
import { notFound } from "next/navigation";
import SearchForm from "@/app/search/SearchForm";
import ViewRegion from "./ViewRegion";
import SocialComponent from "@/app/components/social/SocialComponent";
<<<<<<< HEAD
import type { Country, Region } from "@/app/types";

interface LandingTakeoff {
  id: number;
  name: string;
  latitude: number | undefined;
  longitude: number | undefined;
  description?: string;
}

export default async function Region({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const regionRaw = await get_regions_by_id({ id });
  if (!regionRaw) return notFound();

  const countryRaw = await get_country_by_id({ id: regionRaw.countryId });
  if (!countryRaw) return notFound();

  const sitesRaw = await get_region_landings_takeoffs({ id });

  // Helper: sanitize country
  const country: Country = {
    id: countryRaw.id,
    name: countryRaw.name,
    latitude: countryRaw.latitude ?? undefined,
    longitude: countryRaw.longitude ?? undefined,
    description: countryRaw.description ?? undefined,
  };

  // Helper: sanitize region
  const region: Region = {
    id: regionRaw.id,
    name: regionRaw.name,
    countryId: regionRaw.countryId,
    description: regionRaw.description ?? undefined,
    bestSeason: regionRaw.bestSeason ?? undefined,
  };

  // Fallback description dacă nu există
  const fallbackDescription = `
    <p class="text-xl font-semibold">Explore this amazing region!</p>
    <p>
      This page is under development, but soon you’ll find detailed insights about paragliding spots, takeoff and landing locations, ideal flying seasons, and safety tips specific to this region.
    </p>
    <p class="italic text-blue-700 dark:text-blue-400 font-medium">
      Stay tuned for updates and start planning your next paragliding adventure here!
    </p>
  `;

  // Sanitize takeoff/landing sites
  const takeoff: LandingTakeoff[] = sitesRaw.takeoff.map((t) => ({
    id: t.id,
    name: t.name,
    latitude: t.latitude ?? undefined,
    longitude: t.longitude ?? undefined,
    description: t.description ?? undefined,
  }));

  const landing: LandingTakeoff[] = sitesRaw.landing.map((l) => ({
    id: l.id,
    name: l.name,
    latitude: l.latitude ?? undefined,
    longitude: l.longitude ?? undefined,
    description: l.description ?? undefined,
  }));

  return (
    <div className="space-y-6 p-6">
      {/* Form search cu select */}
      <SearchForm select={{ country, region: [region] }} />

      {/* Vizualizare detalii regiune */}
      <ViewRegion
        country={country}
        region={{ ...region, description: region.description ?? fallbackDescription }}
        takeoff={takeoff}
        landing={landing}
      />

      {/* Social share component */}
      <SocialComponent selectedTipe="r" selectedName={region.name} selectedId={id} />
=======

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
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
    </div>
  );
}
