"use server";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/api/prisma";
import { headers } from "next/headers";

export async function get_page_comment({
  type,
  id,
}: {
  type: "c" | "r" | "t" | "l";
  id: number;
}) {
  if (!type || !id) return { success: false, message: "need type and id " };
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  let rez;
  if (type == "c")
    rez = await prisma.countryComment.findMany({
      where: { countryId: id, deletedAt: null, raport: { lt: 7 } },
      include: {
        user: {
          select: {
            name: true,
            profile: {
              select: {
                public: true,
                url: true,
              },
            },
          },
        },
      },
    });
  if (type == "r")
    rez = await prisma.regionComment.findMany({
      where: { regionId: id, deletedAt: null, raport: { lt: 7 } },
      include: {
        user: {
          select: {
            name: true,
            profile: {
              select: {
                public: true,
                url: true,
              },
            },
          },
        },
      },
    });
  if (type == "t")
    rez = await prisma.takeoffComment.findMany({
      where: {
        takeoffId: id,
        deletedAt: null,
        raport: { lt: 7 },
      },
      include: {
        user: {
          select: {
            name: true,
            profile: {
              select: {
                public: true,
                url: true,
              },
            },
          },
        },
      },
    });

  if (type == "l")
    rez = await prisma.landingComment.findMany({
      where: { landingId: id, deletedAt: null, raport: { lt: 7 } },
      include: {
        user: {
          select: {
            name: true,
            profile: {
              select: {
                public: true,
                url: true,
              },
            },
          },
        },
      },
    });
  return { comments: rez, user: session?.user.id || null };
}
