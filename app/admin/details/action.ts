"use server";
import { prisma } from "@/app/api/prisma";
import { revalidatePath } from "next/cache";

export async function get_landing_description(id: number) {
  const rez = await prisma.landing.findUnique({
    where: { id: id },
    select: { description: true },
  });
  return rez?.description || null;
}

export async function update_landing_description(formData: FormData) {
  const id = Number(formData.get("id"));

  const json = {
    description: formData.get("description"),
    access: {
      parking:
        formData.get("parking") === "yes"
          ? true
          : formData.get("parking") === "no"
          ? false
          : undefined,
      roadConditions: formData.get("roadConditions")?.toString() || "",
      publicTransport:
        formData.get("publicTransport") === "yes"
          ? true
          : formData.get("publicTransport") === "no"
          ? false
          : undefined,
      cableToTakeoff:
        formData.get("cableToTakeoff") === "yes"
          ? true
          : formData.get("cableToTakeoff") === "no"
          ? false
          : undefined,
      shuttleToTakeoff:
        formData.get("shuttleToTakeoff") === "yes"
          ? true
          : formData.get("shuttleToTakeoff") === "no"
          ? false
          : undefined,
      notes: formData.get("accessNotes")?.toString() || "",
    },
    facilities: {
      toilets:
        formData.get("toilets") === "yes"
          ? true
          : formData.get("toilets") === "no"
          ? false
          : undefined,
      foodNearby:
        formData.get("foodNearby") === "yes"
          ? true
          : formData.get("foodNearby") === "no"
          ? false
          : undefined,
      camping:
        formData.get("camping") === "yes"
          ? true
          : formData.get("camping") === "no"
          ? false
          : undefined,
      contactWebsite: formData.get("contactWebsite")?.toString() || "",
    },
    safety: {
      landingDifficulty: formData.get("landingDifficulty")?.toString() || "",
      commonHazards: (formData.get("commonHazards")?.toString() || "")
        .split(",")
        .map((s) => s.trim()),
      notes: formData.get("safetyNotes")?.toString() || "",
    },
    notes: formData.get("notes")?.toString() || "",
  };

  const jsonString = JSON.stringify(json, null, 2);

  await prisma.landing.update({
    where: { id },
    data: { description: jsonString },
  });
  revalidatePath(`/landing/${id}`);
  revalidatePath(`/admin/details/landing?id=${id}`);
}

export async function get_country_description(id: number) {
  const rez = await prisma.country.findUnique({
    where: { id: id },
    select: { description: true },
  });
  return rez?.description || null;
}

export async function update_country_description(formData: FormData) {
  const custom: Record<string, string[]> = {};

  let index = 0;

  while (true) {
    const name = formData.get(`custom_name_${index}`);
    const value = formData.get(`custom_value_${index}`);

    if (!name) break;

    const key = name.toString().trim();
    const raw = value?.toString().trim() || "";

    // Convert textarea în array (separate by newline)
    const arr = raw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    custom[key] = arr;
    index++;
  }

  const data = {
    title: formData.get("title")?.toString() || "",
    subtitle: formData.get("subtitle")?.toString() || "",
    authority: {
      url: formData.get("autUrl")?.toString() || "",
      name: formData.get("autName")?.toString() || "",
    },
    overview: (formData.get("overview")?.toString() || "")
      .split("\n")
      .filter((x) => x.trim() !== ""),
    regulations: (formData.get("regulations")?.toString() || "")
      .split("\n")
      .filter((x) => x.trim() !== ""),
    custom, // aici obiectul final
  };

  const rez = await prisma.country.update({
    where: { id: Number(formData.get("id")) },
    data: { description: JSON.stringify(data, null, 2) },
  });
  revalidatePath(`/country/${rez.id}`);
  revalidatePath(`/admin/details/landing?id=${rez.id}`);
}

export async function get_region_description(id: number) {
  const rez = await prisma.region.findUnique({
    where: { id: id },
    select: { description: true },
  });
  return rez?.description || null;
}

export async function update_region_description(formData: FormData) {
  const id = Number(formData.get("id"));

  // checkboxes return "on" if checked, null if not
  const isChecked = (name: string) => formData.get(name) !== null;

  const json = {
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),

    overview: (formData.get("overview")?.toString() || "")
      .split("\n")
      .map((s) => s.trim()),

    transport: {
      text: (formData.get("regulations")?.toString() || "")
        .split("\n")
        .map((s) => s.trim()),

      cable: isChecked("cable"),
      shuttle: isChecked("shuttle"),
      car: isChecked("car"),
      hike: isChecked("hike"),
    },

    fly: (formData.get("fly")?.toString() || "")
      .split("\n")
      .map((s) => s.trim()),

    roules: (formData.get("roules")?.toString() || "")
      .split("\n")
      .map((s) => s.trim()),

    link: {
      url: formData.get("autUrl"),
      name: formData.get("autName"),
    },
  };

  const jsonString = JSON.stringify(json, null, 2);
  const rez = await prisma.region.update({
    where: { id },
    data: { description: jsonString },
  });
  revalidatePath(`/region/${rez.id}`);
  revalidatePath(`/admin/details/region?id=${rez.id}`);
}
