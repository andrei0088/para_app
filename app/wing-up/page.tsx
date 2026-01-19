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

export default async function WindUpPage() {
  const places: PlacesCommunity = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/wing-up/get-places`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div>
      <div>
        <h1>Wind Up with other pilots</h1>
        <p>here we can be in touch with local pilots</p>
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        Country :
        {Object.entries(places).map(([letter]) => (
          <div key={letter}>
            <h2>{letter}</h2>
          </div>
        ))}
      </div>

      {Object.entries(places).map(([letter, countries]) => (
        <div key={letter}>
          <h2>{letter}</h2>

          {countries.map((c) => (
            <div key={c.id} style={{ marginLeft: 16 }}>
              <h3>{c.name}:</h3>

              <div className="flex gap-2">
                {c.regions.map((r) => (
                  <div key={r.id} style={{ marginLeft: 16 }}>
                    <p>{r.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
