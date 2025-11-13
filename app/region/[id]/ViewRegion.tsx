import ViewRegionMap from "./ViewRegionMap";

interface Takeoff {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  description?: string;
  map?: string;
  regionId?: number;
  countryId?: number;
}

interface Landing {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  description?: string;
  map?: string;
  regionId?: number;
  countryId?: number;
}

interface Region {
  id: number;
  name: string;
  description?: string;
  bestSeason?: number[];
  map?: string | null;
  seo?: string | null;
}

interface Country {
  id: number;
  name: string;
}

interface RegionSearchProps {
  country: Country;
  region: Region;
  takeoff: Takeoff[];
  landing: Landing[];
}

export default function ViewRegion({
  region,
  takeoff,
  landing,
}: RegionSearchProps) {
  const maps = [
    ...(region.map ? [region.map] : []),
    ...[...takeoff, ...landing]
      .filter((i) => i.map)
      .map((i) => i.map!)
      .filter((m, i, self) => self.indexOf(m) === i),
  ].filter(Boolean);

  const fallbackDescription = `
    <p class="text-xl font-semibold">Explore this amazing region!</p>
    <p>
      This page is under development, but soon you’ll find detailed insights about paragliding spots, takeoff and landing locations, ideal flying seasons, and safety tips specific to this region.
    </p>
    <p class="italic text-blue-700  font-medium">
      Stay tuned for updates and start planning your next paragliding adventure here!
    </p>
  `;
  return (
    <section className="w-full p-4 ">
      {region.map && (
        <div className="w-full rounded-xl overflow-hidden mb-5">
          <ViewRegionMap map={region.map} maps={maps} />
        </div>
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: region.description || fallbackDescription,
        }}
      />
    </section>
  );
}
