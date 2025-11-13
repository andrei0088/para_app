import { Country, Region } from "@prisma/client";
import AddNewPlace from "./AddNewPlace";

interface AddPlacePageProps {
  country: Country[]; // sau ce tip are country în realitate
  region: Region[]; // sau ce tip are region
}

export default async function AddPlacePage({
  country,
  region,
}: AddPlacePageProps) {
  return <AddNewPlace countries={country} regions={region} />;
}
