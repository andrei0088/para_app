import { prisma } from "@/app/api/prisma";

export async function get_country_maps(id: number) {
  const rez = await prisma.region.findMany({
    where: {
      countryId: id,
      AND: [{ map: { not: null } }, { map: { not: "" } }],
    },
    select: { id: true, name: true, map: true },
  });

  return rez;
}
