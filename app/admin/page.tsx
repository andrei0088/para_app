import {
  get_all_country,
  get_all_landing,
  get_all_regions,
  get_all_takeoff,
} from "../api/get/get_places";
import ViewPlacesEdit from "./ViewPlacesEdit";
import AddPlace from "./AddPlace";
import { revalidateAllCache } from "./revalidateCache";
import EditDetails from "./EditDetails";

// Props pentru Raported

export default async function AdminPage() {
  // Preluare date
  const countryData = await get_all_country();
  const regionData = await get_all_regions();
  const takeoffData = await get_all_takeoff();
  const landingData = await get_all_landing();

  // Mapare comentarii brute în Comment tipat

  return (
    <div className="p-6 space-y-6">
      {/* Buton Revalidate Cache */}
      <div className="flex justify-end">
        <button
          onClick={revalidateAllCache}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Revalidate Cache
        </button>
      </div>

      {/* Comentarii raportate */}
      {/* <Raported comments={mappedComments} /> */}

      {/* Vizualizare și editare locuri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ViewPlacesEdit
          countrys={countryData}
          regions={regionData}
          takeoffs={takeoffData}
          landings={landingData}
        />
        <AddPlace country={countryData} region={regionData} />
        <EditDetails />
      </div>
    </div>
  );
}
