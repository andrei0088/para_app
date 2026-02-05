import { prisma } from "@/lib/prisma";

interface GetToSitesParams {
  id?: number;
}
export async function get_country_by_id({ id }: GetToSitesParams = {}) {
  return await prisma.country.findFirst({
    where: { id },
  });
}

export async function get_all_country() {
  return await prisma.country.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function get_regions_by_id({ id }: GetToSitesParams = {}) {
  return await prisma.region.findFirst({
    where: { id },
  });
}

export async function get_all_regions() {
  return await prisma.region.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      takeoffs: { select: { id: true } },
      landings: { select: { id: true } },
    },
  });
}

export async function get_all_regions_with_sites() {
  return await prisma.region.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      takeoffs: true, // include takeoff sites
      landings: true, // include landing sites
    },
  });
}

export async function get_country_regions({ id }: GetToSitesParams = {}) {
  if (!id) return []; // optional: returnează array gol dacă nu există id

  return await prisma.region.findMany({
    where: { countryId: id }, // caută toate regiunile care au countryId = id
    orderBy: { name: "asc" }, // optional: sortează după nume
    include: {
      takeoffs: true,
      landings: true,
    },
  });
}

export async function get_takeoff_by_id({ id }: GetToSitesParams = {}) {
  return await prisma.takeoff.findFirst({
    where: { id },
  });
}

export async function get_all_takeoff() {
  return await prisma.takeoff.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function get_landing_by_id({ id }: GetToSitesParams = {}) {
  return await prisma.landing.findFirst({
    where: { id },
  });
}

export async function get_all_landing() {
  return await prisma.landing.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function get_country_landings_takeoffs({
  id,
}: GetToSitesParams = {}) {
  if (!id) return { takeoff: [], landing: [] };

  const regions = await prisma.region.findMany({
    where: { countryId: id },
    include: {
      takeoffs: true,
      landings: true,
    },
  });

  const takeoff: (typeof regions)[0]["takeoffs"] = [];
  const landing: (typeof regions)[0]["landings"] = [];

  regions.forEach((r) => {
    takeoff.push(...r.takeoffs);
    landing.push(...r.landings);
  });

  return { takeoff, landing };
}

export async function get_region_landings_takeoffs({
  id,
}: GetToSitesParams = {}) {
  if (!id) return { takeoff: [], landing: [] };

  const region = await prisma.region.findFirst({
    where: { id },
    include: {
      takeoffs: true,
      landings: true,
    },
  });

  if (!region) return { takeoff: [], landing: [] };

  const takeoff = region.takeoffs ?? [];
  const landing = region.landings ?? [];

  return { takeoff, landing };
}

export async function get_all_community() {
  const community = await prisma.community.findMany({
    where: { validated: true },
    select: {
      id: true,
      name: true,
      url: true,
      latitude: true,
      longitude: true,
    },
  });
  return community;
}
