import {
  get_landing_by_id,
  get_region_landings_takeoffs,
} from "@/app/api/get/get_places";
import { get_landing_details } from "@/app/api/get/get_details";
import ViewLanding from "./ViewLanding";
import LandingDetails from "./LandingDetails";
import SocialComponent from "@/app/components/social/SocialComponent";

interface PageProps {
  params: { id: string };
}

export default async function LandingPage({ params }: PageProps) {
  const para = await params;
  const id = Number(para.id);
  if (isNaN(id)) {
    return (
      <p className="text-center text-gray-500 mt-10">Invalid landing ID.</p>
    );
  }

  // 1️⃣ Preluăm landing
  const landingRaw = await get_landing_by_id({ id });
  if (!landingRaw) {
    return (
      <p className="text-center text-gray-500 mt-10">Landing not found.</p>
    );
  }

  // 2️⃣ Preluăm detalii
  const rawDetail = await get_landing_details({ id });
  if (!rawDetail || !rawDetail.country || !rawDetail.region) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Landing details not found.
      </p>
    );
  }

  // 3️⃣ Preluăm site-uri din regiune
  const sitesRaw = await get_region_landings_takeoffs({
    id: rawDetail.region.id,
  });

  // 4️⃣ Fallback descriere
  const landingDescriptionFallback = `
    <p class="text-xl font-semibold">Discover this landing spot!</p>
    <p>Detailed info about this landing site, nearby takeoffs, safety tips, and best seasons will be available soon.</p>
    <p class="italic text-blue-700  font-medium">
      Stay tuned for full updates and start preparing for your next paragliding adventure!
    </p>
  `;

  // 5️⃣ Normalizare date landing
  const landing = {
    ...landingRaw,
    description:
      landingRaw.description && landingRaw.description.trim() !== ""
        ? landingRaw.description
        : landingDescriptionFallback,
    map: landingRaw.map ?? "",
  };

  // 6️⃣ Normalizare detalii
  const details = {
    country: {
      id: rawDetail.country.id,
      name: rawDetail.country.name,
    },
    region: {
      id: rawDetail.region.id,
      name: rawDetail.region.name,
      map: rawDetail.region.map ?? "",
      bestSeason: rawDetail.region.bestSeason ?? [],
    },
  };

  // 7️⃣ Colectăm toate hărțile disponibile (fără null/undefined)
  const maps: string[] = Array.from(
    new Set([
      ...sitesRaw.takeoff.map((t) => t.map).filter((m): m is string => !!m),
      ...sitesRaw.landing.map((l) => l.map).filter((m): m is string => !!m),
    ])
  );

  return (
    <div className="space-y-6 dark:text-gray-800">
      {/* Detalii landing + regiune */}
      <LandingDetails details={details} sites={sitesRaw} />

      {/* Vizualizare landing + hărți */}
      <ViewLanding landing={landing} details={details} maps={maps} />

      {/* Social sharing */}
      <SocialComponent
        selectedTipe="l"
        selectedName={landing.name}
        selectedId={id}
      />
    </div>
  );
}
