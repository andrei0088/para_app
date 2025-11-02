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

    const profile = await prisma.profile.findFirst({
      where: { userId: session.user.id },
    });

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
      where: { userId: session.user.id },
      data: { url },
    });

    return { success: true, data: rez };
  } catch (error: any) {
    console.error("Error changing URL:", error);
    return { success: false, message: error.message || "Unexpected error." };
  }
}




export async function change_profile(formData: FormData) {
  try {
    const bio = formData.get("bio");
    const sex = formData.get("sex");
    const publicProfile = formData.get("public");

    // Extragem toate linkurile video
    const videosForm = formData.getAll("videos[]"); // array de string
    const videos: string[] = videosForm
      .filter((v) => typeof v === "string" && v.trim() !== "")
      .map((v) => (v as string).trim());

    const session = await auth.api.getSession({ headers: headers() });
    if (!session?.user?.id) return { success: false, message: "User not logged in" };

    const updated = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        bio: typeof bio === "string" ? bio : null,
        sex: typeof sex === "string" ? sex : null,
        public: publicProfile === "yes" ? true : false,
        videos: videos.length > 0 ? videos : [], // salvăm array-ul în baza de date
      },
    });

    return { success: true, data: updated };
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

