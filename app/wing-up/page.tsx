import Link from "next/link";
import SelectCommunity from "./SelectCommunity";
import CreateCountry from "./CreateCountry";

type Region = {
  id: string;
  name: string;
};

type Country = {
  id: string;
  name: string;
  url?: string;
  regions: Region[];
};

type PlacesCommunity = Record<string, Country[]>;

export default async function WindUpPage() {
  const places: PlacesCommunity = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/wing-up/get-places`,
    { cache: "no-store" },
  ).then((res) => res.json());

  return (
    <div>
      <SelectCommunity />
      {Object.entries(places).map(([letter, countries]) => (
        <div key={letter}>
          <Link
            href={`/wing-up/${letter}`}
            className="hover:underline hover:text-cyan-900"
          >
            <h2>{letter}</h2>
          </Link>

          {countries.map((c) => (
            <div key={c.id} style={{ marginLeft: 16 }}>
              <Link
                href={
                  c.url ? `/community/${c.url}` : `/wing-up/community/c${c.id}`
                }
                className="hover:underline hover:text-cyan-900"
              >
                <h3>{c.name}:</h3>
              </Link>

              <div className="flex gap-2">
                {c.regions.map((r) => (
                  <div key={r.id} style={{ marginLeft: 16 }}>
                    <Link
                      href={`/wing-up/community/r${r.id}`}
                      className="hover:underline hover:text-cyan-900"
                    >
                      <p>{r.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <CreateCountry />
    </div>
  );
}
