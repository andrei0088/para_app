import React from "react";
import BestSeson from "./BestSeson";
import TopView from "@/app/components/dinamic/TopView";
import ViewSites from "./ViewSites";
import JoinView from "@/app/components/dinamic/JoinView";
import ViewOnMap from "@/app/components/dinamic/ViewOnMap";
import ViewSiteMap from "./ViewSiteMap";
import { Landing, Takeoff } from "@/app/types";

interface Region {
  id: number | string;
  name: string;
  countryId: number | string;
  map?: string | null;
  bestSeason?: number[]; // ✅ Acum este opțional
}

interface LeftRegionProps {
  region: Region;
  takeoff: Takeoff[];
  landing: Landing[];
}

const LeftRegion: React.FC<LeftRegionProps> = ({
  region,
  takeoff,
  landing,
}) => {
  const maps = [
    ...(region.map ? [region.map] : []),
    ...[...takeoff, ...landing]
      .filter((i) => i.map)
      .map((i) => i.map!)
      .filter((m, i, self) => self.indexOf(m) === i),
  ].filter(Boolean);

  return (
    <div className="w-full md:w-3/7 p-4 relative ">
      <BestSeson months={region.bestSeason ?? []} /> {/* ✅ fallback */}
      <TopView component="r" id={Number(region.id)} />
      <ViewSites takeoff={takeoff} landing={landing} />
      <JoinView />
      <ViewOnMap
        country={Number(region.countryId)}
        region={Number(region.id)}
        name={region.name}
      />
      <div className=" flex flex-wrap gap-3 p-3">
        {maps.map((m, index) =>
          index !== 0 ? (
            <div key={index} className="rounded-xl overflow-hidden">
              <ViewSiteMap map={m} maps={maps} />
            </div>
          ) : null
        )}
      </div>
      <div className="hidden md:block absolute right-0 top-0 h-full w-0.5 bg-linear-to-b from-gray-100 via-cyan-500 to-gray-200"></div>
    </div>
  );
};

export default LeftRegion;
