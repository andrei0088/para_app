import HomeMap from "./components/homeComponents/HomeMap";
import SearchHome from "./components/homeComponents/SearchHome";
import ViewAllPlaces from "./components/homeComponents/ViewAllPlaces";
import SEO from "./components/Seo";

export default function Home() {
  const seo =
    "Discover the world's most iconic paragliding destinations and learn everything about paragliding. From breathtaking landscapes to expert tips, explore the thrill of flying with our comprehensive guides and inspiring stories.";

  return (
    <div>
      <SEO title={"Home"} description={seo} />

      <HomeMap />
      <SearchHome />
      <ViewAllPlaces />
    </div>
  );
}
