import Link from "next/link";
import SelectCommunity from "../SelectCommunity";
import CreateCountry from "../CreateCountry";

type Region = {
  id: string;
  name: string;
};

type Country = {
  id: string;
  name: string;
  regions: Region[];
};

type PlacesCommunity = Record<string, Country[]>;

export default async function WindUpLetter({
  params,
}: {
  params: { fletter: string };
}) {
  const { fletter } = await params;

  const places: Country[] = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/wing-up/get-places/${fletter}`,
    { cache: "no-store" },
  ).then((res) => res.json());

  return (
    <div>
      <SelectCommunity fletter={fletter} />
      <div className="">
        {places.map((place: Country) => (
          <div key={place.id} className="p-2 shadow-sm rounder-sm">
            <Link
              href={`/wing-up/community/c${place.id}`}
              className="hover:text-cyan-900"
            >
              <h2 className="underline text-2xl">{place.name}</h2>
            </Link>

            <ul className="text-xl underline indent-2 flex gap-4">
              {place.regions.map((region: Region) => (
                <li key={region.id} className=" p-2 hover:shadow-sm rounded-sm">
                  {" "}
                  <Link
                    href={`/wing-up/community/r${region.id}`}
                    className="hover:text-cyan-700"
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <CreateCountry />
    </div>
  );
}
