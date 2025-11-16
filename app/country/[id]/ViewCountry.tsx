import type { Country } from "@/app/types";
import CountryImage from "./CountryImage";

interface CountrySearchProps {
  country: Country;
}

export default function ViewCountry({ country }: CountrySearchProps) {
  const countryDescriptionFallback = `
    <p class="text-2xl font-semibold"><strong>Welcome to the paragliding guide for ${country.name}!</strong></p>
    <hr /><br />
    <p>
      We are currently working on adding detailed information about this country, 
      including descriptions, regions, takeoff and landing sites, and useful flying tips.
    </p>
    <p>
      Our goal is to provide the most accurate and helpful information for paragliding enthusiasts 
      exploring ${country.name}. However, this page is still under development.
    </p>
    <p>
      If you would like to help us improve this guide, you can leave a comment or send us an email. 
      Your contributions will help us identify the best takeoff and landing locations, 
      as well as provide useful insights for safe and enjoyable paragliding experiences in this country.
    </p>
    <p class="italic text-green-700  font-medium">
      Together, we can create the ultimate guide for paragliding in ${country.name}! 
      Stay tuned for updates and thank you for your support.
    </p>
  `;
  return (
    <div className="w-full md:w-3/4 px-2 my-4">
      <div className="relative">
        <CountryImage map={country.image} name={country.name} />
      </div>

      <div
        className="mt-5"
        dangerouslySetInnerHTML={{
          __html: country.description || countryDescriptionFallback,
        }}
      />
    </div>
  );
}
