import type { Country } from "@/app/types";

interface CountrySearchProps {
  country: Country;
}

export default function ViewCountry({ country }: CountrySearchProps) {
  return (
    <div
      className="w-full md:w-3/4 p-4 dark:text-gray-800"
      dangerouslySetInnerHTML={{
        __html: country.description || " Error",
      }}
    />
  );
}
