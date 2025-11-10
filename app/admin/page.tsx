import {
  get_all_country,
  get_all_landing,
  get_all_regions,
  get_all_takeoff,
} from "../api/get/get_places";
import ViewPlacesEdit from "./ViewPlacesEdit";
import AddPlace from "./AddPlace";
import Raported from "./Raported";
import { revalidateAllCache } from "./revalidateCache";

// ===== Tipuri =====

// Tipul brut venit din API
type RawComment = {
  id: number;
  userId: string;
  userName?: string; // opțional, poate lipsi
  comment: string;
  raport: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt: Date | null;
  countryId?: number;
  regionId?: number;
  takeoffId?: number;
  landingId?: number;
};

// Tipul folosit în componentă
type Comment = {
  id: number;
  comment: string;
  userId: string;
  raport: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
  };
};

// Props pentru Raported
type RaportedProps = {
  country: Comment[];
  region: Comment[];
  takeoff: Comment[];
  landing: Comment[];
};

export default async function AdminPage() {
  // Preluare date
  const countryData = await get_all_country();
  const regionData = await get_all_regions();
  const takeoffData = await get_all_takeoff();
  const landingData = await get_all_landing();
  const commentsData = undefined;

  // Mapare comentarii brute în Comment tipat
  const mapComments = (arr: RawComment[] | null): Comment[] =>
    arr?.map((c) => ({
      id: c.id,
      comment: c.comment,
      userId: c.userId,
      raport: c.raport,
      deletedAt: c.deletedAt,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt ?? c.createdAt,
      user: { id: c.userId, name: c.userName ?? "Unknown" },
    })) ?? [];

  // const mappedComments: RaportedProps = {
  //   country: mapComments(commentsData.country),
  //   region: mapComments(commentsData.region),
  //   takeoff: mapComments(commentsData.takeoff),
  //   landing: mapComments(commentsData.landing),
  // };

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
        <AddPlace />
      </div>
    </div>
  );
}
