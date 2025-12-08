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

  let descriptionJson = null;
  if (country.description) {
    try {
      descriptionJson = JSON.parse(country.description);
    } catch (e) {
      console.error("Invalid JSON in country.description", e);
    }
  }

  return (
    <div className="w-full md:w-3/4 px-2 my-4">
      <div className="relative">
        <CountryImage map={country.image} name={country.name} />
      </div>
      <div className="pt-5 leading-relaxed">
        {descriptionJson ? (
          <article className="prose prose-lg max-w-none text-gray-800">
            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {descriptionJson.title}
            </h1>

            {/* Subtitle */}
            {descriptionJson.subtitle && (
              <p className="text-xl text-gray-600 mb-6 indent-4">
                {descriptionJson.subtitle}
              </p>
            )}

            {/* overview */}
            {descriptionJson.overview && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mt-6">
                  Overview
                </h2>

                <div className="text-xl text-gray-600 mb-6 indent-4">
                  {descriptionJson.overview
                    .split("\r\n")
                    .map((val: string, index: number) => (
                      <p key={index}>{val}</p>
                    ))}{" "}
                </div>
              </>
            )}

            {/* regulations */}
            {descriptionJson.regulations && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mt-6">
                  Regulations
                </h2>
                <div className="text-xl text-gray-600 mb-6 indent-4">
                  {descriptionJson.regulations
                    // .split("\r\n")
                    .map((val: string, index: number) => (
                      <p key={index}>{val}</p>
                    ))}{" "}
                </div>
              </>
            )}

            {/* authority */}
            {descriptionJson.authority.name && (
              <p className="text-xl text-gray-800 mb-6">
                <strong>Authority : </strong>{" "}
                <a
                  href={descriptionJson.authority.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 underline"
                >
                  {descriptionJson.authority.name}
                </a>
              </p>
            )}
            {/* Sections */}
            {Object.entries(descriptionJson.custom).map(([key, value]) => (
              <section key={key} className="mt-10 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 mt-6">
                  {key}
                </h2>

                {Array.isArray(value) ? (
                  value.map((p, i) => (
                    <p key={i} className="text-gray-700 indent-4">
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-700 indent-4">{String(value)}</p>
                )}
              </section>
            ))}
            {/* Authority link */}
            {descriptionJson.Authority && (
              <p className=" mb-8">
                <strong>Authority: </strong>
                <span
                  className="text-blue-800 underline"
                  dangerouslySetInnerHTML={{
                    __html: descriptionJson.Authority,
                  }}
                />
              </p>
            )}
          </article>
        ) : (
          /* Fallback */
          <article
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: countryDescriptionFallback }}
          />
        )}
      </div>
    </div>
  );
}
