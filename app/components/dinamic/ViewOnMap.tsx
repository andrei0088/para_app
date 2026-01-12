import Link from "next/link";

interface ViewOnMapProps {
  country?: number | string;
  region?: number | string;
  name: string;
}

export default function ViewOnMap({ country, region, name }: ViewOnMapProps) {
  if (region)
    return (
      <Link
        href={`/map?region=${region}`}
        className="flex items-center justify-center gap-2 py-3 my-2 px-6  rounded-sm cursor-pointer hover:bg-cyan-50 hover:border-cyan-500 hover:text-cyan-700 hover:shadow-lg"
      >
        View {name} on map
      </Link>
    );

  if (country)
    return (
      <Link
        href={`/map?country=${country}`}
        className="flex items-center justify-center  gap-2 py-3 my-2 px-6   rounded-sm cursor-pointer hover:bg-cyan-50 hover:border-cyan-500 hover:text-cyan-700 hover:shadow-lg"
      >
        View {name} on map
      </Link>
    );

  return null; // fallback dacă nu există nici țară, nici regiune
}
