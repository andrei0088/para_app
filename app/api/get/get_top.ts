"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface LikeParams {
  component: "c" | "r" | "t" | "l";
  id: number;
}

// ===== MAPPING MODELS =====
const likeModels = {
  c: {
    key: "countryId",
    path: "/country/",
    create: (data: { userId: string; countryId: number }) => prisma.countryLike.create({ data }),
    delete: (userId: string, id: number) =>
      prisma.countryLike.delete({ where: { userId_countryId: { userId, countryId: id } } }),
    count: (id: number) => prisma.countryLike.count({ where: { countryId: id } }),
    findFirst: (userId: string, id: number) =>
      prisma.countryLike.findFirst({ where: { userId, countryId: id } }),
  },
  r: {
    key: "regionId",
    path: "/region/",
    create: (data: { userId: string; regionId: number }) => prisma.regionLike.create({ data }),
    delete: (userId: string, id: number) =>
      prisma.regionLike.delete({ where: { userId_regionId: { userId, regionId: id } } }),
    count: (id: number) => prisma.regionLike.count({ where: { regionId: id } }),
    findFirst: (userId: string, id: number) =>
      prisma.regionLike.findFirst({ where: { userId, regionId: id } }),
  },
  t: {
    key: "takeoffId",
    path: "/takeoff/",
    create: (data: { userId: string; takeoffId: number }) => prisma.takeoffLike.create({ data }),
    delete: (userId: string, id: number) =>
      prisma.takeoffLike.delete({ where: { userId_takeoffId: { userId, takeoffId: id } } }),
    count: (id: number) => prisma.takeoffLike.count({ where: { takeoffId: id } }),
    findFirst: (userId: string, id: number) =>
      prisma.takeoffLike.findFirst({ where: { userId, takeoffId: id } }),
  },
  l: {
    key: "landingId",
    path: "/landing/",
    create: (data: { userId: string; landingId: number }) => prisma.landingLike.create({ data }),
    delete: (userId: string, id: number) =>
      prisma.landingLike.delete({ where: { userId_landingId: { userId, landingId: id } } }),
    count: (id: number) => prisma.landingLike.count({ where: { landingId: id } }),
    findFirst: (userId: string, id: number) =>
      prisma.landingLike.findFirst({ where: { userId, landingId: id } }),
  },
} as const;

// ===== GIVE TOP (LIKE) =====
export async function giveTop({ component, id }: LikeParams) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/user/login");

  switch (component) {
    case "c":
      await prisma.countryLike.create({ data: { userId: session.user.id, countryId: id } });
      revalidatePath(`/country/${id}`);
      break;
    case "r":
      await prisma.regionLike.create({ data: { userId: session.user.id, regionId: id } });
      revalidatePath(`/region/${id}`);
      break;
    case "t":
      await prisma.takeoffLike.create({ data: { userId: session.user.id, takeoffId: id } });
      revalidatePath(`/takeoff/${id}`);
      break;
    case "l":
      await prisma.landingLike.create({ data: { userId: session.user.id, landingId: id } });
      revalidatePath(`/landing/${id}`);
      break;
    default:
      throw new Error("Invalid component type");
  }

  return { success: true };
}



// ===== REMOVE TOP (UNLIKE) =====
export async function remove_top({ component, id }: LikeParams) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/user/login");

  const model = likeModels[component];

  try {
    await model.delete(session.user.id, id);
    revalidatePath(`${model.path}${id}`);
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ===== GET TOTAL TOP COUNT =====
export async function get_top({ component, id }: LikeParams) {
  const model = likeModels[component];
  return await model.count(id);
}

// ===== GET IF USER HAS LIKED =====
export async function get_user_top({ component, id }: LikeParams) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return false;

  const model = likeModels[component];
  const like = await model.findFirst(session.user.id, id);

  return like !== null;
}
