import type { Country } from "@/app/types";
import CountryImage from "./CountryImage";

interface CountrySearchProps {
  country: Country;
}

export default function ViewCountry({ country }: CountrySearchProps) {
  const countryDescriptionFallback = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-800">
        Welcome to the paragliding guide for ${country.name}!
      </h2>
      <p>
        We are currently working on adding detailed information about this country, 
        including descriptions, regions, takeoff and landing sites, and useful flying tips.
      </p>
      <p>
        Our goal is to provide the most accurate and helpful information for paragliding enthusiasts 
        exploring ${country.name}. However, this page is still under development.
      </p>
      <p>
        If you would like to help us improve this guide, feel free to leave a comment or send us an email.
        Your contributions will help us identify the best takeoff and landing locations,
        as well as provide useful insights for safe and enjoyable paragliding experiences.
      </p>
      <p class="italic text-green-700 font-medium">
        Together we can create the ultimate guide for paragliding in ${country.name}! 
        Stay tuned for updates and thank you for your support.
      </p>
    </div>
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
    <div className="w-full px-4 md:px-8 py-6 mx-auto max-w-4xl leading-relaxed">
      {/* Hero Image */}
      <div className="w-full overflow-hidden rounded-2xl mb-10">
        <CountryImage map={country.image} name={country.name} />
      </div>

      {descriptionJson ? (
        <article className="prose prose-lg max-w-none text-gray-800">
          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            {descriptionJson.title}
          </h1>

          {/* Subtitle */}
          {descriptionJson.subtitle && (
            <p className="text-xl text-gray-600 mb-6">
              {descriptionJson.subtitle}
            </p>
          )}

          {/* Authority link */}
          {descriptionJson.Authority && (
            <p className=" mb-8">
              <strong>Authority: </strong>
              <span
                className="text-blue-800 underline"
                dangerouslySetInnerHTML={{ __html: descriptionJson.Authority }}
              />
            </p>
          )}

          {/* Sections */}
          {Object.entries(descriptionJson).map(
            ([key, value]) =>
              key !== "title" &&
              key !== "subtitle" &&
              key !== "Authority" && (
                <section key={key} className="mt-10 space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mt-6">
                    {key}
                  </h2>

                  {Array.isArray(value) ? (
                    value.map((p, i) => (
                      <p key={i} className="text-gray-700">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-700">{String(value)}</p>
                  )}
                </section>
              )
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
  );
}
