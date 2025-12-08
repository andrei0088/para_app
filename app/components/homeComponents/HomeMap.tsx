import MapGenerate from "../map/MapGenerate";

export default async function HomeMap() {
  // Tuple cu exact 2 elemente
  const center: [number, number] = [46.577, 9.975];

  return (
    <div className="h-[30vh] ">
      <MapGenerate center={center} zoom={6} />
    </div>
  );
}
