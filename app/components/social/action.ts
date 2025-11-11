"use server";
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import type { CommentType } from "@prisma/client";

const mapCharToCommentType: Record<string, CommentType> = {
  c: "Country",
  r: "Region",
  t: "Takeoff",
  l: "Landing",
};

async function getSessionUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.id;
}

function getPrismaType(type: string): CommentType | null {
  const prismaType = mapCharToCommentType[type.toLowerCase()];
  return prismaType ?? null;
}

// ------------------- get_like_comment -------------------
export async function get_like_comment({
  commentId,
  type,
}: {
  commentId: number;
  type: string;
}) {
  if (!commentId || !type) {
    return { success: false, message: "Need an id and a type" };
  }

  const prismaType = getPrismaType(type);
  if (!prismaType) {
    return { success: false, message: "Invalid comment type" };
  }

  try {
    const userId = await getSessionUserId();

    const likeCount = await prisma.commentLike.count({
      where: { id: commentId, type: prismaType },
    });

    let userLiked = false;
    if (userId) {
      const found = await prisma.commentLike.findFirst({
        where: { id: commentId, type: prismaType, userId },
      });
      userLiked = Boolean(found);
    }

    return { success: true, data: likeCount, userLiked, logd: !!userId };
  } catch (error) {
    console.error("Error in get_like_comment:", error);
    return { success: false, message: "Failed to get comment like data." };
  }
}

// ------------------- add_comment_like -------------------
export async function add_comment_like({
  commentId,
  type,
}: {
  commentId: number;
  type: string;
}) {
  if (!commentId || !type) {
    return { success: false, message: "Need an id and a type" };
  }

  const prismaType = getPrismaType(type);
  if (!prismaType) {
    return { success: false, message: "Invalid comment type" };
  }

  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to like a comment.",
      };
    }

    const exists = await prisma.commentLike.findFirst({
      where: { commentId, type: prismaType, userId },
      select: { id: true },
    });

    if (exists) {
      return {
        success: false,
        message: "You have already liked this comment.",
      };
    }

    await prisma.commentLike.create({
      data: { commentId, type: prismaType, userId },
    });

    return { success: true, message: "Comment liked successfully." };
  } catch (error) {
    console.error("Error in add_comment_like:", error);
    return { success: false, message: "Failed to like comment." };
  }
}

// ------------------- remove_comment_like -------------------
export async function remove_comment_like({
  commentId,
  type,
}: {
  commentId: number;
  type: string;
}) {
  if (!commentId || !type) {
    return { success: false, message: "Need an id and a type" };
  }

  const prismaType = getPrismaType(type);
  if (!prismaType) {
    return { success: false, message: "Invalid comment type" };
  }

  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to remove a like.",
      };
    }

    const likeRecord = await prisma.commentLike.findFirst({
      where: { commentId, type: prismaType, userId },
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
