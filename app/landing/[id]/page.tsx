import {
  get_landing_by_id,
  get_region_landings_takeoffs,
} from "@/app/api/get/get_places";
import { get_landing_details } from "@/app/api/get/get_details";
import ViewLanding from "./ViewLanding";
import LandingDetails from "./LandingDetails";
import SocialComponent from "@/app/components/social/SocialComponent";
import SEO from "@/app/components/Seo";

interface PageProps {
  params: { id: string };
}

export default async function LandingPage({ params }: PageProps) {
  const prop = await params;
  const id = Number(prop.id);
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

  // 5️⃣ Normalizare date landing (description poate fi gol)
  const landing = {
    ...landingRaw,
    description:
      landingRaw.description && landingRaw.description.trim() !== ""
        ? landingRaw.description
        : "", // nu mai folosim fallback
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
    <>
      <SEO title={landing.name} description={landing.description} />

      {/* Detalii landing + regiune */}
      <LandingDetails details={details} sites={sitesRaw} />

      {/* Vizualizare landing + hărți */}
      <ViewLanding landing={landing} details={details} maps={maps} />
      <div className="w-full h-px rounded-sm bg-linear-to-r from-cyan-100 via-slate-500 to-cyan-100 blur-[0.3px]" />

      {/* Social sharing */}
      <SocialComponent
        selectedTipe="l"
        selectedName={landing.name}
        selectedId={id}
      />
    </>
  );
}
