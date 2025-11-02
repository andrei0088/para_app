import { get_landing_by_id, get_region_landings_takeoffs } from "@/app/api/get/get_places";
import { get_landing_details } from "@/app/api/get/get_details";
import ViewLanding from "./ViewLanding";
import LandingDetails from "./LandingDetails";
import SocialComponent from "@/app/components/social/SocialComponent";

interface PageProps {
  params: { id: string };
}

export default async function LandingPage({ params }: PageProps) {
  const id = Number(params.id);

  // Preluăm landing
  const landing = await get_landing_by_id({ id });
  if (!landing) {
    return <p className="text-center text-gray-500 mt-10">Landing not found.</p>;
  }

  // Preluăm detalii
  const details = await get_landing_details({ id });
  if (!details || !details.country || !details.region) {
    return <p className="text-center text-gray-500 mt-10">Landing details not found.</p>;
  }

  // Preluăm takeoff/landing pentru regiune
  const sites = await get_region_landings_takeoffs({ id: details.region.id });

  // Construim un obiect sigur de tip Details
  const safeDetails = {
    country: {
      id: details.country.id,
      name: details.country.name,
    },
    region: {
      id: details.region.id,
      name: details.region.name,
      bestSeason: details.region.bestSeason || [],
    },
  };

const landingDescriptionFallback = `
  <p class="text-xl font-semibold">
    Discover this landing spot!
  </p>
  <p>
    Detailed information about this landing site, nearby takeoffs, safety tips, and best seasons will be available soon.
  </p>
  <p>
    Our goal is to help pilots and adventure seekers plan safe and scenic flights ending at this location.
  </p>
  <p class="italic text-blue-700 dark:text-blue-400 font-medium">
    Stay tuned for full updates and start preparing for your next paragliding adventure!
  </p>
`;

const landingWithDescription = {
  ...landing,
  description: landing.description ?? landingDescriptionFallback,
};


  return (
    <div>
      <LandingDetails details={safeDetails} sites={sites} />
      <ViewLanding landing={landingWithDescription} details={safeDetails} />
      <SocialComponent selectedTipe={"l"} selectedName={landing.name} selectedId={id} /> 
    </div>
  );
}
