"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export default async function getProfileByUrl(url: string) {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        url,
        public: true,
      },
    });

    if (!profile) {
      return { success: false, message: "Profile not found or not public" };
    }

    return { success: true, data: profile };
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return { success: false, message };
  }
}
export async function get_profile_video(id: number) {
  try {
    const userId = Number(id);

    // Validare simplă
    if (isNaN(userId)) {
      throw new Error("Invalid user ID");
    }

    const rez = await prisma.video.findMany({
      where: {
        profileId: userId,
        deleted: null,
        reported: { lt: 7 }, // doar raport < 7
      },
    });

    return { success: true, data: rez };
  } catch (error) {
    return { success: false, error: error || "Unknown error" };
  }
}

export async function get_profile_like(profileId: number) {
  const id = Number(profileId);
  try {
    const profileId = Number(id);
    if (!profileId)
      return { success: false, message: "Profile ID is missing." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const likeCount = await prisma.profileLike.count({
      where: { profileId },
    });

    let userLiked = false;
    if (session?.user?.id) {
      const found = await prisma.profileLike.findFirst({
        where: { profileId, userId: session.user.id },
      });
      userLiked = Boolean(found);
    }
    const logd = !!session?.user;
    return { success: true, data: likeCount, userLiked, logd };
  } catch (error) {
    return { success: false, message: "Failed to get like data:" + error };
  }
}

export async function add_profile_like(id: number) {
  try {
    const profileId = Number(id);
    if (!profileId)
      return { success: false, message: "Profile ID is missing." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id)
      return {
        success: false,
        message: "You must be logged in to like profiles.",
      };

    const exists = await prisma.profileLike.findFirst({
      where: { profileId, userId: session.user.id },
      select: { id: true },
    });

    if (exists)
      return {
        success: false,
        message: "You have already liked this profile.",
      };

    await prisma.profileLike.create({
      data: { profileId, userId: session.user.id },
    });
    revalidatePath("/profile");

    return { success: true, message: "Profile liked successfully." };
  } catch (error) {
    return { success: false, message: "Failed to like the profile:" + error };
  }
}

export async function remove_profile_like(id: number) {
  try {
    const profileId = Number(id);
    if (!profileId)
      return { success: false, message: "Profile ID is missing." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id)
      return {
        success: false,
        message: "You must be logged in to unlike profiles.",
      };

    const likeRecord = await prisma.profileLike.findFirst({
      where: { profileId, userId: session.user.id },
      select: { id: true },
    });

    if (!likeRecord)
      return { success: false, message: "You haven't liked this profile yet." };

    await prisma.profileLike.delete({ where: { id: likeRecord.id } });
    revalidatePath("/profile");

    return { success: true, message: "Profile unliked successfully." };
  } catch (error) {
    return { success: false, message: "Failed to remove like." + error };
  }
}

export async function get_video_like(id: number) {
  try {
    const videoId = Number(id);
    if (!videoId) return { success: false, message: "Video ID is missing." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const likeCount = await prisma.videoLike.count({
      where: { videoId },
    });

    let userLiked = false;
    if (session?.user?.id) {
      const found = await prisma.videoLike.findFirst({
        where: { videoId, userId: session.user.id },
      });
      userLiked = Boolean(found);
    }

    const logd = !!session?.user;
    return { success: true, data: likeCount, userLiked, logd };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get video like data." + error,
    };
  }
}

// --- ADD VIDEO LIKE ---
export async function add_video_like(id: number) {
  try {
    const videoId = Number(id);
    if (!videoId) return { success: false, message: "Video ID is missing." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id)
      return {
        success: false,
        message: "You must be logged in to like videos.",
      };

    const exists = await prisma.videoLike.findFirst({
      where: { videoId, userId: session.user.id },
      select: { id: true },
    });

    if (exists)
      return {
        success: false,
        message: "You have already liked this video.",
      };

    await prisma.videoLike.create({
      data: { videoId, userId: session.user.id },
    });

    revalidatePath("/videos"); // sau ruta relevantă

    return { success: true, message: "Video liked successfully." };
  } catch (error) {
    return { success: false, message: "Failed to like the video." + error };
  }
}

// --- REMOVE VIDEO LIKE ---
export async function remove_video_like(id: number) {
  try {
    const videoId = Number(id);
    if (!videoId) return { success: false, message: "Video ID is missing." };

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id)
      return {
        success: false,
        message: "You must be logged in to unlike videos.",
      };

    const likeRecord = await prisma.videoLike.findFirst({
      where: { videoId, userId: session.user.id },
      select: { id: true },
    });

    if (!likeRecord)
      return { success: false, message: "You haven't liked this video yet." };

    await prisma.videoLike.delete({ where: { id: likeRecord.id } });
    revalidatePath("/videos"); // sau ruta relevantă

    return { success: true, message: "Video unliked successfully." };
  } catch (error) {
    return { success: false, message: "Failed to remove video like." + error };
  }
}
