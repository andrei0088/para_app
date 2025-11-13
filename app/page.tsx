import HomeMap from "./components/homeComponents/HomeMap";
import SearchHome from "./components/homeComponents/SearchHome";
import ViewAllPlaces from "./components/homeComponents/ViewAllPlaces";
import SEO from "./components/Seo";
import TopVideo from "./components/TopVideo/TopVideo";

export default function Home() {
  const seo =
    "Discover the world's most iconic paragliding destinations and learn everything about paragliding. From breathtaking landscapes to expert tips, explore the thrill of flying with our comprehensive guides and inspiring stories.";

  return (
    <div className="z-40">
      <SEO title={"Home"} description={seo} />

      <HomeMap />
      <SearchHome />
      <div className="flex flex-col md:flex-row gap-2 mb-2 mt-2">
        <div className="w-full md:w-5/7 md:border-r md:border-gray-100 md:pr-2">
          <ViewAllPlaces />
        </div>
        <div className="w-full md:w-2/5 md:pl-2">
          <TopVideo />
        </div>
      </div>
    </div>
  );
}
