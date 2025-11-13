export const dynamic = "force-dynamic";

import { getRandomVideos, getTopVideos } from "./action";
import RandomVideo from "./RandomVideo";
import TopVideoClient from "./TopVideoClient";

export default async function SomePage() {
  const topVideos = await getTopVideos(); // server-side fetch
  const randomVideo = await getRandomVideos(4);

  return (
    <div className="space-y-2">
      <TopVideoClient topVideos={topVideos} />
      <RandomVideo videos={randomVideo} />
    </div>
  );
}
