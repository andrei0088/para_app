import {
  get_country_by_id,
  get_country_landings_takeoffs,
  get_country_regions,
} from "@/app/api/get/get_places";

import ViewCountry from "./ViewCountry";
import MapGenerate from "@/app/components/map/MapGenerate";
import SearchForm from "@/app/search/SearchForm";
import { notFound } from "next/navigation";
import LeftCountry from "./LeftCountry";
import SEO from "@/app/components/Seo";
import SocialComponent from "@/app/components/social/SocialComponent";

interface CountryPageProps {
  params: { id: string };
}
export const dynamic = "auto"; // default behavior

export default async function Country({ params }: CountryPageProps) {
  const paramsId = await params;
  const id = Number(paramsId.id);

  const [country, regionsRaw, sitesRaw] = await Promise.all([
    get_country_by_id({ id }),
    get_country_regions({ id }),
    get_country_landings_takeoffs({ id }),
  ]);

  // --- Obține țara ---
  if (!country) notFound();

  // --- Regiuni ---
  const regions = regionsRaw.map((r) => ({
    id: r.id,
    name: r.name,
    countryId: r.countryId,
    bestSeason: r.bestSeason ?? [],
    description: r.description ?? undefined, // normalizează null -> undefined
    map: r.map ?? undefined, // normalizează null -> undefined
    takeoffs: (r.takeoffs ?? []).map((t) => ({
      id: t.id,
      name: t.name,
      latitude: t.latitude ?? undefined,
      longitude: t.longitude ?? undefined,
      altitude: t.altitude,
      description: t.description ?? undefined,
      regionId: t.regionId,
      countryId: t.countryId,
      map: t.map ?? undefined,
    })),
    landings: (r.landings ?? []).map((l) => ({
      id: l.id,
      name: l.name,
      latitude: l.latitude ?? undefined,
      longitude: l.longitude ?? undefined,
      altitude: l.altitude,
      description: l.description ?? undefined,
      regionId: l.regionId,
      countryId: l.countryId,
      map: l.map ?? undefined,
    })),
  }));

  // --- Takeoff + Landing pentru țară ---
  const sites = {
    takeoff: sitesRaw.takeoff.map((t) => ({
      ...t,
      map: t.map ?? "",
      description: t.description ?? "",
    })),
    landing: sitesRaw.landing.map((l) => ({
      ...l,
      map: l.map ?? "",
      description: l.description ?? "",
    })),
  };

  // --- Determină lunile active ---
  const months = Array.from(new Set(regions.flatMap((r) => r.bestSeason))).sort(
    (a, b) => a - b
  );

  // --- Sezoane afișate ---
  const displaySeason = [
    { name: "Spring", emoji: "🌱", months: [3, 4, 5] },
    { name: "Summer", emoji: "☀️", months: [6, 7, 8] },
    { name: "Autumn", emoji: "🍂", months: [9, 10, 11] },
    { name: "Winter", emoji: "❄️", months: [12, 1, 2] },
  ];
  const seasons = displaySeason.filter((s) =>
    s.months.some((m) => months.includes(m))
  );

  // --- Fallback descriere ---
  const countryDescriptionFallback = `
    <p className="text-xl font-semibold"><strong>Welcome to the paragliding guide for ${country.name}!</strong></p>
    <hr /><br />
    <p>
      We are currently working on adding detailed information about this country, 
      including descriptions, regions, takeoff and landing sites, and useful flying tips.
    </p>
    <p>
      Our goal is to provide the most accurate and helpful information for paragliding enthusiasts 
      exploring ${country.name}. However, this page is still under development.
    </p>
    <p>
      If you would like to help us improve this guide, you can leave a comment or send us an email. 
      Your contributions will help us identify the best takeoff and landing locations, 
      as well as provide useful insights for safe and enjoyable paragliding experiences in this country.
    </p>
    <p className="italic text-green-700  font-medium">
      Together, we can create the ultimate guide for paragliding in ${country.name}! 
      Stay tuned for updates and thank you for your support.
    </p>
  `;

  const countrySafe = {
    ...country,
    description: country.description ?? countryDescriptionFallback,
    latitude: country.latitude ?? undefined,
    longitude: country.longitude ?? undefined,
  };

  return (
    <div className="my-2 py-2 dark:text-gray-800 z-40">
      <SEO title={country.name} description={country.seo} />
      {/* Harta */}
      <div className="h-[30vh] rounded-xl overflow-hidden shadow-md mb-4 ">
        <MapGenerate
          center={
            countrySafe.latitude && countrySafe.longitude
              ? [countrySafe.latitude, countrySafe.longitude]
              : undefined
          }
        />
      </div>

      {/* Search */}
      <SearchForm select={{ country: countrySafe, region: regions }} />
      <div className="max-w-full xl:max-w-7xl mx-auto bg-gray-50 rounded-2xl shadow-lg mt-2 pt-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b border-gray-200  py-2 px-5">
          {country.name}
        </h1>

        <div className="flex md:flex-row flex-col-reverse gap-4 ">
          {/* LeftCountry pe stânga pe desktop */}
          <LeftCountry
            countryName={country.name}
            countryId={country.id}
            regions={regions}
            sites={sites}
            months={months}
            seasons={seasons}
          />

          {/* ViewCountry pe dreapta pe desktop */}
          <ViewCountry country={countrySafe} />
        </div>
        <div className="w-full h-1 rounded-full bg-linear-to-r from-cyan-50 via-black to-cyan-50 blur-[0.3px]" />

        {/* Social */}
        <SocialComponent
          selectedTipe="c"
          selectedId={id}
          selectedName={country.name}
        />
      </div>
    </div>
  );
}
