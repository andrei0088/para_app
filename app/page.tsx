import { Suspense } from "react";
import HomeMap from "./components/homeComponents/HomeMap";
import SearchHome from "./components/homeComponents/SearchHome";
import ViewAllPlaces from "./components/homeComponents/ViewAllPlaces";
import SEO from "./components/Seo";
import TopVideo from "./components/TopVideo/TopVideo";
import TopSites from "./components/homeComponents/TopSites";

export default function Home() {
  const seo =
    "Discover the world's most iconic paragliding destinations and learn everything about paragliding. From breathtaking landscapes to expert tips, explore the thrill of flying with our comprehensive guides and inspiring stories.";

  return (
    <div className="z-40 ">
      <SEO title={"Home"} description={seo} />
      <Suspense fallback={<div className="text-gray-500">Loading map...</div>}>
        <HomeMap />
      </Suspense>
      <SearchHome />
      <div className="mx-2 ">
        <div className="w-full ">
          <Suspense
            fallback={
              <div className="text-gray-500">
                Loading all grate flying places...
              </div>
            }
          >
            <TopSites />
          </Suspense>
        </div>
        <div className="w-full mx-2">
          <Suspense
            fallback={<div className="text-gray-500">Loading videos...</div>}
          >
            <TopVideo />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
