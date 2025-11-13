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

  return (
    <section className="w-full p-4 ">
      {region.map && (
        <div className="w-full rounded-xl overflow-hidden mb-5">
          <ViewRegionMap map={region.map} maps={maps} />
        </div>
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: region.description || "Error ",
        }}
      />
    </section>
  );
}
