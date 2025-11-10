"use server";
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function get_profiles(list: number[]) {
  if (!list || list.length === 0) return [];

  const rez = await prisma.profile.findMany({
    where: {
      id: { in: list },
      public: true,
    },
    select: {
      id: true,
      url: true,
    },
  });

  return rez;
}

const mapCharToCommentType: Record<
  string,
  "Country" | "Region" | "Takeoff" | "Landing"
> = {
  c: "Country",
  r: "Region",
  t: "Takeoff",
  l: "Landing",
};

export async function get_like_comment({
  commentId,
  type,
}: {
  commentId: number;
  type: string; // așteptăm "c", "r", "t", "l"
}) {
  try {
    if (!commentId || !type) {
      return { success: false, message: "Need an id and a type" };
    }

    const prismaType = mapCharToCommentType[type.toLowerCase()];
    if (!prismaType) {
      return { success: false, message: "Invalid comment type" };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const likeCount = await prisma.commentLike.count({
      where: { commentId, type: prismaType },
    });

    let userLiked = false;
    if (session?.user?.id) {
      const found = await prisma.commentLike.findFirst({
        where: { commentId, type: prismaType, userId: session.user.id },
      });
      userLiked = Boolean(found);
    }

    const logd = !!session?.user;

    return { success: true, data: likeCount, userLiked, logd };
  } catch (error) {
    console.error("Error in get_like_comment:", error);
    return { success: false, message: "Failed to get comment like data." };
  }
}

export async function add_comment_like({
  commentId,
  type,
}: {
  commentId: number;
  type: string;
}) {
  try {
    if (!commentId || !type) {
      return { success: false, message: "Need an id and a type" };
    }

    const prismaType = mapCharToCommentType[type.toLowerCase()];
    if (!prismaType) {
      return { success: false, message: "Invalid comment type" };
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to like a comment.",
      };
    }

    const exists = await prisma.commentLike.findFirst({
      where: { commentId, type: prismaType, userId: session.user.id },
      select: { id: true },
    });

    if (exists) {
      return {
        success: false,
        message: "You have already liked this comment.",
      };
    }

    await prisma.commentLike.create({
      data: { commentId, type: prismaType, userId: session.user.id },
    });

    return { success: true, message: "Comment liked successfully." };
  } catch (error) {
    console.error("Error in add_comment_like:", error);
    return { success: false, message: "Failed to like comment." };
  }
}

export async function remove_comment_like({
  commentId,
  type,
}: {
  commentId: number;
  type: string;
}) {
  try {
    if (!commentId || !type) {
      return { success: false, message: "Need an id and a type" };
    }

    const prismaType = mapCharToCommentType[type.toLowerCase()];
    if (!prismaType) {
      return { success: false, message: "Invalid comment type" };
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to remove a like.",
      };
    }

    const likeRecord = await prisma.commentLike.findFirst({
      where: { commentId, type: prismaType, userId: session.user.id },
      select: { id: true },
    });

    if (!likeRecord) {
      return { success: false, message: "You haven't liked this comment yet." };
    }

    await prisma.commentLike.delete({ where: { id: likeRecord.id } });

    return { success: true, message: "Comment like removed successfully." };
  } catch (error) {
    console.error("Error in remove_comment_like:", error);
    return { success: false, message: "Failed to remove comment like." };
  }
}
