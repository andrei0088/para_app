import Link from "next/link";

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

export default async function SelectCommunity({
  fletter,
}: {
  fletter?: string;
}) {
  const places: PlacesCommunity = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/wing-up/get-places`,
    { cache: "no-store" },
  ).then((res) => res.json());
  return (
    <div>
      <h1>Wind Up with other pilots</h1>
      <p>here we can be in touch with local pilots</p>

      <div className="flex flex-row flex-wrap gap-2 text-2xl text-slate-500 font-semibold">
        <span className="text-black">Country :</span>

        <Link href="/wing-up" className="underline ">
          All
        </Link>
        {Object.entries(places).map(([letter]) => (
          <div key={letter} className="text-xl">
            <Link href={`/wing-up/${letter}`}>
              {letter === fletter ? (
                <h2 style={{ textDecoration: "underline" }}>{letter}</h2>
              ) : (
                <h2 className="text-slate-500 hover:text-slate-900 underline">
                  {letter}
                </h2>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
