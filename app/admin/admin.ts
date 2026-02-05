"use server";
import dbConnect from "@/lib/mongodb";
import { prisma } from "@/lib/prisma";
import CountryComment from "@/models/CountryComment";
import LandingComment from "@/models/LandingComment";
import Posts from "@/models/Posts";
import RegionComment from "@/models/RegionComment";
import TakeoffComment from "@/models/TakeoffComment";

export async function get_country_region_all() {
  try {
    const country = await prisma.country.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const region = await prisma.region.findMany({
      select: {
        id: true,
        name: true,
        countryId: true,
      },
    });
    return { succes: true, rez: { country: country, region: region } };
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function add_country(name: string) {
  if (!name) return { success: false, error: "Country name is required" };

  try {
    const rez = await prisma.country.create({ data: { name } });

    return { success: true, rez: rez.id };
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("Unique constraint failed")) {
      return { success: false, error: "Country already exists" };
    }

    return { success: false, error: (e as Error).message || "Unknown error" };
  }
}

export async function add_region(name: string, country: number) {
  if (!name && !country)
    return {
      success: false,
      error: "Region name and country selection are required",
    };
  const countryId = Number(country);
  try {
    const rez = await prisma.region.create({ data: { name, countryId } });

    return { success: true, rez: rez.id };
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("Unique constraint failed")) {
      return { success: false, error: "Region already exists" };
    }

    return { success: false, error: (e as Error).message || "Unknown error" };
  }
}
export async function add_takeoff(
  name: string,
  country: number,
  region: number,
  latitude: number,
  longitude: number,
  altitude: number,
) {
  try {
    const rez = await prisma.takeoff.create({
      data: {
        name,
        countryId: country,
        regionId: region,
        latitude,
        longitude,
        altitude,
      },
    });
    return { success: true, rez: rez.id };
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function add_landing(
  name: string,
  country: number,
  region: number,
  latitude: number,
  longitude: number,
  altitude: number,
) {
  try {
    const rez = await prisma.landing.create({
      data: {
        name,
        countryId: country,
        regionId: region,
        latitude,
        longitude,
        altitude,
      },
    });

    return { success: true, rez: rez.id };
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function raported() {
  await dbConnect();

  const query = {
    report: { $ne: 0 },
    deletedAt: null,
  };

  const [country, region, landing, takeoff, posts] = await Promise.all([
    CountryComment.find(query),
    RegionComment.find(query),
    LandingComment.find(query),
    TakeoffComment.find(query),
    Posts.find(query),
  ]);

  return { country, region, landing, takeoff, posts };
}
