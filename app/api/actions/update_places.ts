"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BasePlace, PlaceType } from "@/app/types";

export async function updatePlace(type: PlaceType, data: BasePlace) {
  const { id, ...updateData } = data;

  if (!id) throw new Error("ID is required for update");

  let pathToRevalidate = "/";

  switch (type) {
    case "country":
      await prisma.country.update({ where: { id }, data: updateData });
      pathToRevalidate = `/country/${id}`;
      break;

    case "region":
      await prisma.region.update({ where: { id }, data: updateData });
      pathToRevalidate = `/region/${id}`;
      break;

    case "takeoff":
      await prisma.takeoff.update({ where: { id }, data: updateData });
      pathToRevalidate = `/takeoff/${id}`;
      break;

    case "landing":
      await prisma.landing.update({ where: { id }, data: updateData });
      pathToRevalidate = `/landing/${id}`;
      break;

    default:
      throw new Error("Unknown type");
  }

  revalidatePath(pathToRevalidate);

  return { success: true };
}

export async function addPlace(
  type: PlaceType,
  name: string,
  options: {
    countryId?: number;
    regionId?: number;
    latitude?: number;
    longitude?: number;
    altitude?: number;
  } = {}
) {
  if (!name) return { success: false, message: "Name is required" };

  try {
    let rez: { id: number };

    switch (type) {
      case "country":
        rez = await prisma.country.create({ data: { name } });
        break;

      case "region":
        if (!options.countryId)
          return { success: false, message: "countryId required for region" };
        rez = await prisma.region.create({
          data: { name, countryId: options.countryId },
        });
        break;

      case "takeoff":
      case "landing":
        if (
          !options.countryId ||
          !options.regionId ||
          options.latitude == null ||
          options.longitude == null ||
          options.altitude == null
        )
          return {
            success: false,
            message:
              "countryId, regionId, latitude, longitude, altitude required",
          };

        rez =
          type === "takeoff"
            ? await prisma.takeoff.create({
                data: {
                  name,
                  countryId: options.countryId,
                  regionId: options.regionId,
                  latitude: options.latitude,
                  longitude: options.longitude,
                  altitude: options.altitude,
                },
              })
            : await prisma.landing.create({
                data: {
                  name,
                  countryId: options.countryId,
                  regionId: options.regionId,
                  latitude: options.latitude,
                  longitude: options.longitude,
                  altitude: options.altitude,
                },
              });
        break;

      default:
        return { success: false, message: "Unknown type" };
    }

    return { success: true, id: rez.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, message };
  }
}
