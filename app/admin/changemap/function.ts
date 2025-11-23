import { prisma } from "@/app/api/prisma";

export async function get_country_maps(id: number) {
  const map = await prisma.country.findUnique({
    where: { id: id },
    select: { image: true, id: true, name: true },
  });
  return map;
}

export async function get_region_maps(id: number) {
  const map = await prisma.region.findUnique({
    where: { id: id },
    select: { map: true, id: true, name: true },
  });
  return map;
}
export async function get_takeoff_maps(id: number) {
  const map = await prisma.takeoff.findUnique({
    where: { id: id },
    select: { map: true, id: true, name: true },
  });
  return map;
}
export async function get_landing_maps(id: number) {
  const map = await prisma.landing.findUnique({
    where: { id: id },
    select: { map: true, id: true, name: true },
  });
  return map;
}
