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
