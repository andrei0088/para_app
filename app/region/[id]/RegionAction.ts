import { prisma } from "@/app/api/prisma";

export default async function get_region(id: number) {
  const region = await prisma.region.findUnique({
    where: { id },
  });
  if (!region) return null;
  else return region;
}
