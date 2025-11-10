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
        className="flex items-center justify-center gap-2 py-3 my-2 px-6 border-2 border-gray-900 rounded-full cursor-pointer hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700 hover:shadow-lg"
      >
        View {name} on map
      </Link>
    );

  if (country)
    return (
      <Link
        href={`/map?country=${country}`}
        className="flex items-center justify-center dark:text-gray-800 gap-2 py-3 my-2 px-6 border-2 border-gray-900 rounded-full cursor-pointer hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700 hover:shadow-lg"
      >
        View {name} on map
      </Link>
    );

  return null; // fallback dacă nu există nici țară, nici regiune
}
