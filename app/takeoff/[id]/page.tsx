import {
  get_takeoff_by_id,
  get_region_landings_takeoffs,
} from "@/app/api/get/get_places";
import { get_takoff_details } from "@/app/api/get/get_details";
import ViewTakeoff from "./ViewTakeoff";
import TakeoffDetails from "./TakeoffDetails";
import SocialComponent from "@/app/components/social/SocialComponent";
import SEO from "@/app/components/Seo";

interface PageProps {
  params: { id: string };
}

export default async function TakeoffPage({ params }: PageProps) {
  const para = await params;
  const id = Number(para.id);
  if (isNaN(id)) {
    return (
      <p className="text-center text-gray-500 mt-10">Invalid takeoff ID.</p>
    );
  }

  // 1️⃣ Preluare takeoff
  const takeoffRaw = await get_takeoff_by_id({ id });
  if (!takeoffRaw) {
    return (
      <p className="text-center text-gray-500 mt-10">Takeoff not found.</p>
    );
  }

  // 2️⃣ Preluare detalii
  const rawDetail = await get_takoff_details({ id });
  if (!rawDetail || !rawDetail.region || !rawDetail.country) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Takeoff details not found.
      </p>
    );
  }

  // 3️⃣ Preluare site-uri (landing/takeoff)
  const sitesRaw = await get_region_landings_takeoffs({
    id: rawDetail.region.id,
  });

  // 4️⃣ Fallback descriere
  const takeoffDescriptionFallback = `
    <p class="text-xl font-semibold">Discover this amazing takeoff spot!</p>
    <p>Detailed info about this takeoff, ideal flying conditions, nearby landing sites, and safety tips will be available soon.</p>
    <p class="italic text-blue-700  font-medium">
      Stay tuned for full updates and start preparing for your next paragliding adventure!
    </p>
  `;

  // 5️⃣ Normalizare date pentru TypeScript
  const takeoff = {
    id: takeoffRaw.id,
    name: takeoffRaw.name,
    latitude: takeoffRaw.latitude,
    longitude: takeoffRaw.longitude,
    altitude: takeoffRaw.altitude ?? 0,
    wind: takeoffRaw.wind ?? undefined,
    description:
      takeoffRaw.description && takeoffRaw.description.trim() !== ""
        ? takeoffRaw.description
        : takeoffDescriptionFallback,
    map: takeoffRaw.map ?? "",
    seo: takeoffRaw.seo ?? undefined,
    regionId: takeoffRaw.regionId,
    countryId: takeoffRaw.countryId,
  };
  const detail = {
    country: {
      id: rawDetail.country.id,
      name: rawDetail.country.name,
    },
    region: {
      id: rawDetail.region.id,
      name: rawDetail.region.name,
      map: rawDetail.region.map ?? "",
    },
  };

  // 6️⃣ Colectăm toate hărțile disponibile (fără null/undefined)
  const maps = Array.from(
    new Set([
      ...sitesRaw.takeoff.map((t) => t.map).filter((m): m is string => !!m),
      ...sitesRaw.landing.map((l) => l.map).filter((m): m is string => !!m),
    ])
  );

  return (
    <div className="space-y-6 dark:text-gray-800">
      <SEO title={takeoff.name} description={takeoff.description} />

      {/* Detalii takeoff + regiune */}
      <TakeoffDetails details={detail} sites={sitesRaw} />

      {/* Vizualizare takeoff + hărți */}
      <ViewTakeoff takeoff={takeoff} details={detail} maps={maps} />

      {/* Social sharing */}
      <SocialComponent
        selectedTipe="t"
        selectedName={takeoff.name}
        selectedId={id}
      />
    </div>
  );
}
