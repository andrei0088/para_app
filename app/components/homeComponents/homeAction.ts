import { prisma } from "@/lib/prisma";

export async function get_top_spots() {
  const n = 12;

  const likes = await prisma.regionLike.groupBy({
    by: ["regionId"],
    _count: { regionId: true },
    orderBy: { _count: { regionId: "desc" } },
    take: n,
  });

  const tops = await Promise.all(
    likes.map(async (like, index) => {
      const region = await prisma.region.findUnique({
        where: { id: like.regionId },
        select: { name: true, landings: true, takeoffs: true, country: true },
      });

      return {
        id: index,
        name: region?.name ?? "Unknown region",
        country: region?.country.name ?? "Unknown country",
        regionId: like.regionId,
        count: like._count.regionId,
        landingsCount: region?.landings.length ?? 0,
        takeoffsCount: region?.takeoffs.length ?? 0,
      };
    })
  );

  return tops;
}
