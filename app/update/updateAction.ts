import { prisma } from "@/lib/prisma";

export async function country(id: number) {
  const rez = await prisma.country.findUnique({
    where: { id: id },
    select: { name: true },
  });
  return rez?.name;
}
