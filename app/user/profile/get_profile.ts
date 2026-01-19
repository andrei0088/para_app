"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers as nextHeaders } from "next/headers";
import { revalidatePath } from "next/cache";
import * as leoProfanity from "leo-profanity";
leoProfanity.loadDictionary("en");
leoProfanity.loadDictionary("fr");
leoProfanity.loadDictionary("ru");

const romanianBadWords = [
  "pula",
  "pule",
  "pizda",
  "muie",
  "fut",
  "cur",
  "bou",
  "prost",
];
const frenchBadWords = ["merde", "putain", "connard", "salope"];
const italianBadWords = ["cazzo", "stronzo", "merda", "puttana"];
const spanishBadWords = ["mierda", "puta", "gilipollas", "coño"];
const germanBadWords = ["scheiße", "arschloch", "ficken", "fotze"];

leoProfanity.add(romanianBadWords);
leoProfanity.add(frenchBadWords);
leoProfanity.add(italianBadWords);
leoProfanity.add(spanishBadWords);
leoProfanity.add(germanBadWords);

function validateWords(comment: string): boolean {
  return !leoProfanity.check(comment);
}

// Convert ReadonlyHeaders → Headers pentru better-auth
async function getAuthHeaders(): Promise<Headers> {
  const readonlyHeaders = await nextHeaders();
  const headersObj = new Headers();
  for (const [key, value] of readonlyHeaders.entries()) {
    headersObj.append(key, value);
  }
  return headersObj;
}

// Tipuri de răspuns
type SuccessResponse<T> = { success: true; data: T };
type ErrorResponse = { success: false; message: string };

export type ProfileData = {
  showAge: boolean;
  id: number;
  userId: string;
  name: string;
  url: string;
  public: boolean;
  sex: string | null;
  bio: string | null;
  bdate: Date;
  raport: number;
  createdAt: Date;
  image: string | null;
};

// ======================================
// GET MY PROFILE
// ======================================
export async function get_my_profile(): Promise<
  SuccessResponse<ProfileData> | ErrorResponse
> {
  try {
    const session = await auth.api.getSession({
      headers: await getAuthHeaders(),
    });
    if (!session?.user?.id)
      return { success: false, message: "User not logged in." };

    const profile = await prisma.profile.findFirst({
      where: { userId: session.user.id },
    });

    if (!profile) return { success: false, message: "Profile not found." };

    return { success: true, data: profile };
  } catch (error: unknown) {
    if (error instanceof Error)
      return { success: false, message: error.message };
    return { success: false, message: "Unexpected error occurred." };
  }
}

// ======================================
// CHANGE URL
// ======================================
export async function change_url(
  formData: FormData
): Promise<SuccessResponse<ProfileData> | ErrorResponse> {
  try {
    const url = formData.get("url");
    if (!url || typeof url !== "string")
      return { success: false, message: "URL not provided or invalid." };

    const session = await auth.api.getSession({
      headers: await getAuthHeaders(),
    });
    if (!session?.user?.id)
      return { success: false, message: "User not logged in." };

    const updated = await prisma.profile.update({
      where: { userId: session.user.id },
      data: { url },
    });

    return { success: true, data: updated };
  } catch (error: unknown) {
    if (error instanceof Error)
      return { success: false, message: error.message };
    return { success: false, message: "Unexpected error occurred." };
  }
}

// ======================================
// CHANGE PROFILE
// ======================================
export async function change_profile(
  formData: FormData
): Promise<SuccessResponse<ProfileData> | ErrorResponse> {
  try {
    const bio = formData.get("bio");
    const sex = formData.get("sex");
    const publicProfile = formData.get("public");
    const showAge = formData.get("showAge");
    const bdateStr = formData.get("bdate");

    if (!bdateStr || typeof bdateStr !== "string") {
      return { success: false, message: "Birth date is required." };
    }

    const bdate = new Date(bdateStr);
    if (isNaN(bdate.getTime())) {
      return { success: false, message: "Invalid birth date." };
    }

    // calcul vârstă
    const today = new Date();
    let age = today.getFullYear() - bdate.getFullYear();
    const m = today.getMonth() - bdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bdate.getDate())) {
      age--;
    }

    if (age < 18 || age > 90) {
      return { success: false, message: "Age must be between 18 and 90." };
    }

    const session = await auth.api.getSession({
      headers: await getAuthHeaders(),
    });
    if (!session?.user?.id)
      return { success: false, message: "User not logged in." };

    // ✅ Conversii corecte din string → boolean.
    const updated = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        bio: typeof bio === "string" ? bio : null,
        sex: sex === "m" || sex === "f" ? sex : null,
        public: publicProfile === "true", // <---- AICI E FIXUL
        showAge: showAge === "true", // <---- AICI E FIXUL
        bdate: bdate,
      },
    });

    return { success: true, data: updated };
  } catch (error: unknown) {
    if (error instanceof Error)
      return { success: false, message: error.message };
    return { success: false, message: "Unexpected error occurred." };
  }
}

export async function changePublic(formData: FormData) {
  const publicValue = formData.get("public");
  let isPublic: boolean | undefined;

  if (publicValue === "yes") isPublic = true;
  else if (publicValue === "no") isPublic = false;

  const session = await auth.api.getSession({
    headers: await getAuthHeaders(),
  });

  if (!session?.user?.id) {
    // dacă userul nu e logat, redirect la login
    throw new Error("User not logged in.");
  }

  await prisma.profile.update({
    where: { userId: session.user.id },
    data: { public: isPublic },
  });

  // Revalidăm pagina curentă pentru a vedea datele actualizate
  revalidatePath("/user/profile");
}

export async function check_url(url: string): Promise<{ taken: boolean }> {
  try {
    if (!url || typeof url !== "string") return { taken: false };

    const existing = await prisma.profile.findUnique({
      where: { url },
      select: { url: true },
    });

    return { taken: !!existing };
  } catch (error: unknown) {
    console.error("Error checking URL:", error);
    return { taken: false }; // în caz de eroare considerăm liber
  }
}

export interface Video {
  id: number;
  profileId: number;
  userId: string;
  url: string;
  name: string;
  createdAt: Date;
  reported: number;
  deleted: Date | null;
}

export async function get_video(): Promise<Video[]> {
  const session = await auth.api.getSession({
    headers: await getAuthHeaders(),
  });

  if (!session?.user?.id) {
    return []; // întotdeauna un array, chiar dacă user-ul nu e logat
  }

  const rez = await prisma.video.findMany({
    where: { userId: session.user.id, deleted: null },
  });

  return rez;
}

export async function add_video(url: string, profileId: number, name: string) {
  // Validare simplă YouTube URL
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  if (!youtubeRegex.test(url)) {
    return { success: false, message: "Not a valid YouTube URL" };
  }
  if (!name) return { success: false, message: "Need a name" };

  // verific numele
  if (!validateWords(name)) return { success: false, message: "Wrong name " };
  const session = await auth.api.getSession({
    headers: await getAuthHeaders(),
  });

  if (!session?.user?.id) {
    return { success: false, message: "User not logged in." };
  }

  try {
    const rez = await prisma.video.create({
      data: {
        profileId: profileId,
        name: name,
        userId: session.user.id,
        url: url,
      },
    });

    if (rez) {
      revalidatePath("/user/profile");
      return { success: true };
    } else return { success: false, message: "Error adding video" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unexpected error occurred." };
  }
}

export async function delete_video(videoId: number, profileId: number) {
  try {
    if (!videoId || !profileId) {
      return { success: false, message: "Invalid video or profile ID." };
    }

    const rez = await prisma.video.update({
      where: {
        id: videoId,
        profileId: profileId,
      },
      data: { deleted: new Date() },
    });

    return {
      success: true,
      message: "Video has been deleted successfully.",
      data: rez,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error || "An unexpected error occurred while deleting the video.",
    };
  }
}

export async function edit_video_name(
  id: number,
  profileId: number,
  name: string
) {
  try {
    const session = await auth.api.getSession({
      headers: await getAuthHeaders(),
    });

    if (!session?.user?.id) {
      return { success: false, message: "User not logged in." };
    }
    const verifica = await prisma.video.findFirst({
      where: { id: id, profileId: profileId, userId: session.user.id },
      select: { deleted: true },
    });
    if (!verifica || verifica.deleted)
      return { succes: false, message: "User not logged in." };
    // Actualizare video
    const rez = await prisma.video.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return { success: true, video: rez };
  } catch (error) {
    console.error("Error updating video name:", error);
    return {
      success: false,
      message: error || "Failed to update video.",
    };
  }
}
