"use server";
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { Country, Landing, Region, Takeoff } from "@prisma/client";
import { headers } from "next/headers";

export async function get_country(id: number) {
  const rez = await prisma.country.findFirst({ where: { id } });
  return rez;
}

export async function get_region(id: number) {
  const rez = await prisma.region.findFirst({
    where: { id },
  });
  return rez;
}

export async function get_takeoff(id: number) {
  const rez = await prisma.takeoff.findFirst({
    where: { id },
  });
  return rez;
}

export async function get_landing(id: number) {
  const rez = await prisma.landing.findFirst({
    where: { id },
  });
  return rez;
}

export async function get_country_name() {
  const rez = await prisma.country.findMany({
    select: { id: true, name: true },
  });
  return rez;
}

export async function get_region_name() {
  const rez = await prisma.region.findMany({
    select: { id: true, name: true, countryId: true },
  });
  return rez;
}

export async function update_country(updated: Country) {
  try {
    if (!updated) return { success: false };
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const isAdmin = await prisma.user.count({
      where: {
        id: session?.user.id,
        userType: "Admin",
      },
    });
    if (isAdmin !== 1) return { success: false };

    await prisma.country.update({
      where: { id: updated.id },
      data: { ...updated },
    });

    return { success: true };
  } catch (e) {
    return { success: false, message: e };
  }
}

export async function update_region(updated: Region) {
  try {
    if (!updated) return { success: false };
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const isAdmin = await prisma.user.count({
      where: {
        id: session?.user.id,
        userType: "Admin",
      },
    });
    if (isAdmin !== 1) return { success: false };

    await prisma.region.update({
      where: { id: updated.id },
      data: { ...updated },
    });

    return { success: true };
  } catch (e) {
    return { success: false, message: e };
  }
}

export async function update_takeoff(updated: Takeoff) {
  try {
    if (!updated)
      return { success: false, message: "No takeoff data provided." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isAdmin = await prisma.user.count({
      where: {
        id: session?.user.id,
        userType: "Admin",
      },
    });

    if (isAdmin !== 1)
      return {
        success: false,
        message: "You are not authorized to update takeoffs.",
      };

    const rez = await prisma.takeoff.update({
      where: { id: updated.id },
      data: { ...updated },
    });

    return {
      success: true,
      message: "Takeoff updated successfully!",
      data: rez,
    };
  } catch (e) {
    return {
      success: false,
      message: "An error occurred while updating." + e,
    };
  }
}

export async function update_landing(updated: Landing) {
  try {
    if (!updated)
      return { success: false, message: "No landing data provided." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isAdmin = await prisma.user.count({
      where: {
        id: session?.user.id,
        userType: "Admin",
      },
    });

    if (isAdmin !== 1)
      return {
        success: false,
        message: "You are not authorized to update landings.",
      };

    // 🔹 Trimite doar câmpurile permise în update
    const rez = await prisma.landing.update({
      where: { id: updated.id },
      data: {
        name: updated.name,
        latitude: updated.latitude,
        longitude: updated.longitude,
        altitude: updated.altitude,
        description: updated.description,
        regionId: updated.regionId,
        countryId: updated.countryId,
        map: updated.map,
        seo: updated.seo,
      },
    });

    return {
      success: true,
      message: "Landing updated successfully!",
      data: rez,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error occurred while updating: " + e,
    };
  }
}
