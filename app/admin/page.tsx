import { get_all_country, get_all_landing, get_all_regions, get_all_takeoff } from "../api/get/get_places";
import ViewPlacesEdit from "./ViewPlacesEdit";
import AddPlace from "./AddPlace";


export default async function admin()
{
const country = await get_all_country();
const region = await get_all_regions();
const takeoff = await get_all_takeoff();
const landing = await get_all_landing();
return (
<div className="flex flex-2">
<ViewPlacesEdit
                 countrys={country}
                 regions={region}
                 takeoffs={takeoff} 
                 landings={landing}
                 />
                 <AddPlace />
                 </div>
                 );
}