<<<<<<< HEAD
"use server";

import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers as nextHeaders } from "next/headers";

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
  id: number;
  userId: string;
  name: string;
  url: string;
  public: boolean;
  sex: string | null;
  bio: string | null;
  bdate: Date;
  videos: string[];
  raport: number;
  createdAt: Date;
};

// ======================================
// GET MY PROFILE
// ======================================
export async function get_my_profile(): Promise<SuccessResponse<ProfileData> | ErrorResponse> {
  try {
    const session = await auth.api.getSession({ headers: await getAuthHeaders() });
    if (!session?.user?.id) return { success: false, message: "User not logged in." };
=======
"use server"
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function get_my_profile() {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: "User not logged in." };
    }
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

    const profile = await prisma.profile.findFirst({
      where: { userId: session.user.id },
    });

<<<<<<< HEAD
    if (!profile) return { success: false, message: "Profile not found." };

    return { success: true, data: profile };
  } catch (error: unknown) {
    if (error instanceof Error) return { success: false, message: error.message };
    return { success: false, message: "Unexpected error occurred." };
  }
}

// ======================================
// CHANGE URL
// ======================================
export async function change_url(formData: FormData): Promise<SuccessResponse<ProfileData> | ErrorResponse> {
  try {
    const url = formData.get("url");
    if (!url || typeof url !== "string") return { success: false, message: "URL not provided or invalid." };

    const session = await auth.api.getSession({ headers: await getAuthHeaders() });
    if (!session?.user?.id) return { success: false, message: "User not logged in." };

    const updated = await prisma.profile.update({
=======
    if (!profile) {
      return { success: false, message: "Profile not found." };
    }

    return { success: true, data: profile };
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return { success: false, message: error.message || "Unexpected error." };
  }
}

export async function change_url(formData: FormData) {
  try {
    const url = formData.get("url");
    if (!url || typeof url !== "string") {
      return { success: false, message: "URL not provided or invalid." };
    }

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: "User not logged in." };
    }

    const rez = await prisma.profile.update({
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
      where: { userId: session.user.id },
      data: { url },
    });

<<<<<<< HEAD
    return { success: true, data: updated };
  } catch (error: unknown) {
    if (error instanceof Error) return { success: false, message: error.message };
    return { success: false, message: "Unexpected error occurred." };
  }
}

// ======================================
// CHANGE PROFILE
// ======================================
export async function change_profile(formData: FormData): Promise<SuccessResponse<ProfileData> | ErrorResponse> {
=======
    return { success: true, data: rez };
  } catch (error: any) {
    console.error("Error changing URL:", error);
    return { success: false, message: error.message || "Unexpected error." };
  }
}




export async function change_profile(formData: FormData) {
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  try {
    const bio = formData.get("bio");
    const sex = formData.get("sex");
    const publicProfile = formData.get("public");

<<<<<<< HEAD
    const videosForm = formData.getAll("videos[]");
    const videos: string[] = videosForm.filter((v): v is string => typeof v === "string" && v.trim() !== "").map(v => v.trim());

    const session = await auth.api.getSession({ headers: await getAuthHeaders() });
    if (!session?.user?.id) return { success: false, message: "User not logged in." };
=======
    // Extragem toate linkurile video
    const videosForm = formData.getAll("videos[]"); // array de string
    const videos: string[] = videosForm
      .filter((v) => typeof v === "string" && v.trim() !== "")
      .map((v) => (v as string).trim());

    const session = await auth.api.getSession({ headers: headers() });
    if (!session?.user?.id) return { success: false, message: "User not logged in" };
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

    const updated = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        bio: typeof bio === "string" ? bio : null,
        sex: typeof sex === "string" ? sex : null,
<<<<<<< HEAD
        public: publicProfile === "yes",
        videos: videos.length > 0 ? videos : [],
=======
        public: publicProfile === "yes" ? true : false,
        videos: videos.length > 0 ? videos : [], // salvăm array-ul în baza de date
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
      },
    });

    return { success: true, data: updated };
<<<<<<< HEAD
  } catch (error: unknown) {
    if (error instanceof Error) return { success: false, message: error.message };
    return { success: false, message: "Unexpected error occurred." };
  }
}

// ======================================
// GET ALL URLS
// ======================================
export async function get_all_url(): Promise<SuccessResponse<{ url: string }[]> | ErrorResponse> {
  try {
    const session = await auth.api.getSession({ headers: await getAuthHeaders() });
    if (!session?.user?.id) return { success: false, message: "User not logged in." };

    const urls = await prisma.profile.findMany({ select: { url: true } });

    return { success: true, data: urls };
  } catch (error: unknown) {
    if (error instanceof Error) return { success: false, message: error.message };
    return { success: false, message: "Unexpected error occurred." };
  }
}
=======
  } catch (err: any) {
    return { success: false, message: err.message || "Unexpected error" };
  }
}


export async function get_all_url() {
try {
    const bio = formData.get("bio");
    const sex = formData.get("sex");
    const publicProfile = formData.get("public");

    const session = await auth.api.getSession({ headers: headers() });
    if (!session?.user?.id) return { success: false, message: "User not logged in" };

    const rez = await prisma.profile.findMany({select:{url:true}})

    return { success: true, data: rez };
  } catch (err: any) {
    return { success: false, message: err.message || "Unexpected error" };
  }

}

>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
