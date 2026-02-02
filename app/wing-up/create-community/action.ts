import { prisma } from "@/lib/prisma";

export async function country_custom() {
  // 1. Comunități de țară existente
  const communityCountries = await prisma.community.findMany({
    where: {
      url: { startsWith: "c" },
    },
    select: {
      id: true,
      url: true,
      name: true,
    },
  });

  // 2. Toate țările
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  // 3. ID-urile țărilor care AU deja comunitate
  const communityCountryIds = new Set(
    communityCountries.map((c) => Number(c.url.slice(1))),
  );

  // 4. Rezultat final
  const rez = [
    // comunități existente
    ...communityCountries.map((c) => ({
      id: c.id,
      name: c.name,
      url: c.url,
      hasCommunity: true,
    })),

    // țări fără comunitate
    ...countries
      .filter((c) => !communityCountryIds.has(c.id))
      .map((c) => ({
        id: c.id,
        name: c.name,
        url: `c${c.id}`,
        hasCommunity: false,
      })),
  ];

  // 5. sortare alfabetică
  return rez.sort((a, b) => a.name.localeCompare(b.name));
}
