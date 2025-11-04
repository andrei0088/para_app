import HomeMap from "./components/homeComponents/HomeMap";
import SearchHome from "./components/homeComponents/SearchHome";
import ViewAllPlaces from "./components/homeComponents/ViewAllPlaces";

export default function Home() {
  return (
    <div > 
        <div className="h-[40vh]">
            <HomeMap />
        </div>
        <div>
            <SearchHome />
        </div>
        <div>
            <ViewAllPlaces />
        </div> 


    </div>  );
}
