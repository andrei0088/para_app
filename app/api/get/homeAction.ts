import { prisma } from "@/lib/prisma";

export async function get_home_country() {
  return await prisma.country.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
export async function get_home_region() {
  return await prisma.region.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      countryId: true,
      bestSeason: true,
      _count: {
        select: {
          takeoffs: true,
          landings: true,
        },
      },
    },
  });
}
