import React from "react";
import BestSeson from "./BestSeson";
import TopView from "@/app/components/dinamic/TopView";
import ViewSites from "./ViewSites";
import JoinView from "@/app/components/dinamic/JoinView";
import ViewOnMap from "@/app/components/dinamic/ViewOnMap";
import ViewSiteMap from "./ViewSiteMap";
import { Landing, Takeoff } from "@/app/types";
import Meteow from "./Meteow";

interface Region {
  id: number | string;
  name: string;
  countryId: number | string;
  map?: string | null;
  bestSeason?: number[]; // ✅ Acum este opțional
  longitude?: number;
  latitude?: number;
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
    <div className="w-full md:w-3/7 p-4 relative space-y-2 min-w-[460px]">
      <BestSeson months={region.bestSeason ?? []} /> {/* ✅ fallback */}
      <TopView component="r" id={Number(region.id)} />
      <ViewSites takeoff={takeoff} landing={landing} />
      <JoinView type="region" id={Number(region.id)} />
      <ViewOnMap
        country={Number(region.countryId)}
        region={Number(region.id)}
        name={region.name}
      />
      <Meteow url={`${region.latitude}N${region.longitude}E`} />
      <div className=" flex flex-wrap gap-3 p-3">
        {maps.map((m, index) =>
          index !== 0 ? (
            <div key={index} className="rounded-sm overflow-hidden">
              <ViewSiteMap map={m} maps={maps} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default LeftRegion;
