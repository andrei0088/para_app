import type { Country } from "@/app/types";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import mapD from "@/public/map_xc.jpg";

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
        {country.image ? (
          <CldImage
            src={country.image}
            width={800}
            height={500}
            crop="fill"
            gravity="auto"
            aspectRatio="16:9"
            alt="Region map"
            style={{ objectFit: "cover", cursor: "pointer" }}
            className="w-full z-0"
            quality="auto"
          />
        ) : (
          <Image
            src={mapD}
            alt={`Default ${country.name} map`}
            width={800}
            height={500}
            className="w-full z-0"
          />
        )}

        {/* Gradient – sub text */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent z-10"></div>

        {/* Text – deasupra gradientului */}
        <div className="absolute inset-0 flex items-end p-6 z-20">
          <div
            className="
        text-3xl md:text-4xl font-extrabold text-yellow-400
        drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]
        tracking-wide uppercase
      "
          >
            <span className="opacity-90">Paragliding in</span>
            <span className="italic ml-2 underline decoration-yellow-300">
              {country.name}
            </span>
          </div>
        </div>
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
