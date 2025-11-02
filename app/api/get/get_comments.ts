"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import * as leoProfanity from "leo-profanity";

// ==== Configurare filtre limbaj ofensator ====
leoProfanity.loadDictionary("en");
leoProfanity.loadDictionary("fr");
leoProfanity.loadDictionary("ru");

const romanianBadWords = ["pula","pule","pizda","muie","fut","cur","bou","prost"];
const frenchBadWords = ["merde","putain","connard","salope"];
const italianBadWords = ["cazzo","stronzo","merda","puttana"];
const spanishBadWords = ["mierda","puta","gilipollas","coño"];
const germanBadWords = ["scheiße","arschloch","ficken","fotze"];

leoProfanity.add(romanianBadWords);
leoProfanity.add(frenchBadWords);
leoProfanity.add(italianBadWords);
leoProfanity.add(spanishBadWords);
leoProfanity.add(germanBadWords);

// ==== Tipuri TS ====
type ComponentType = "c" | "r" | "t" | "l";

interface UserResult {
  success: boolean;
  id: string | null;
  message?: string;
}

// ==== Utilitare ====
function validateComment(comment: string): boolean {
  return !leoProfanity.check(comment);
}

async function getUserId(): Promise<UserResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, message: "Not logged in", id: null };
    }
    return { success: true, id: session.user.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error retrieving session";
    return { success: false, message, id: null };
  }
}

// ==== Adaugă comentariu ====
export async function add_comment(
  component: ComponentType,
  componentId: number,
  comment: string
) {
  if (!comment.trim()) return { success: false, message: "Comment cannot be empty." };
  if (!validateComment(comment)) return { success: false, message: "Please avoid offensive language." };
  if (comment.length > 1000) return { success: false, message: "Comment is too long. Maximum 1000 characters allowed." };

  const user = await getUserId();
  if (!user.success || !user.id) return { success: false, message: "You must be logged in to comment." };

  try {
    switch (component) {
      case "c":
        await prisma.countryComment.create({ data: { userId: user.id, countryId: componentId, comment } });
        revalidatePath(`/country/${componentId}`);
        break;
      case "r":
        await prisma.regionComment.create({ data: { userId: user.id, regionId: componentId, comment } });
        revalidatePath(`/region/${componentId}`);
        break;
      case "t":
        await prisma.takeoffComment.create({ data: { userId: user.id, takeoffId: componentId, comment } });
        revalidatePath(`/takeoff/${componentId}`);
        break;
      case "l":
        await prisma.landingComment.create({ data: { userId: user.id, landingId: componentId, comment } });
        revalidatePath(`/landing/${componentId}`);
        break;
      default:
        return { success: false, message: "Invalid component type." };
    }
    return { success: true, message: "Comment added successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add comment.";
    return { success: false, message };
  }
}

// ==== Obține comentarii ====
type CommentWithUser<T> = T & { user: { id: string; name: string } };

export async function get_country_comments({ id }: { id: number }) {
  const user = await getUserId();
  const comments: CommentWithUser<typeof prisma.countryComment>[] = await prisma.countryComment.findMany({
    where: { countryId: id, deletedAt: null },
    include: { user: true },
  });
  return { userID: user.id, comments };
}

export async function get_region_comments({ id }: { id: number }) {
  const user = await getUserId();
  const comments: CommentWithUser<typeof prisma.regionComment>[] = await prisma.regionComment.findMany({
    where: { regionId: id, deletedAt: null },
    include: { user: true },
  });
  return { userID: user.id, comments };
}

export async function get_takeoff_comments({ id }: { id: number }) {
  const user = await getUserId();
  const comments: CommentWithUser<typeof prisma.takeoffComment>[] = await prisma.takeoffComment.findMany({
    where: { takeoffId: id, deletedAt: null },
    include: { user: true },
  });
  return { userID: user.id, comments };
}

export async function get_landing_comments({ id }: { id: number }) {
  const user = await getUserId();
  const comments: CommentWithUser<typeof prisma.landingComment>[] = await prisma.landingComment.findMany({
    where: { landingId: id, deletedAt: null },
    include: { user: true },
  });
  return { userID: user.id, comments };
}

// ==== Editare și ștergere comentariu ====
type CommentModel = 
  | typeof prisma.countryComment
  | typeof prisma.regionComment
  | typeof prisma.takeoffComment
  | typeof prisma.landingComment;

async function getCommentModel(component: ComponentType, id: number) {
  switch (component) {
    case "c": return prisma.countryComment.findFirst({ where: { id } });
    case "r": return prisma.regionComment.findFirst({ where: { id } });
    case "t": return prisma.takeoffComment.findFirst({ where: { id } });
    case "l": return prisma.landingComment.findFirst({ where: { id } });
  }
}

async function updateCommentModel(component: ComponentType, id: number, text: string) {
  switch (component) {
    case "c": return prisma.countryComment.update({ where: { id }, data: { comment: text } });
    case "r": return prisma.regionComment.update({ where: { id }, data: { comment: text } });
    case "t": return prisma.takeoffComment.update({ where: { id }, data: { comment: text } });
    case "l": return prisma.landingComment.update({ where: { id }, data: { comment: text } });
  }
}

async function deleteCommentModel(component: ComponentType, id: number) {
  switch (component) {
    case "c": return prisma.countryComment.update({ where: { id }, data: { deletedAt: new Date() } });
    case "r": return prisma.regionComment.update({ where: { id }, data: { deletedAt: new Date() } });
    case "t": return prisma.takeoffComment.update({ where: { id }, data: { deletedAt: new Date() } });
    case "l": return prisma.landingComment.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

export async function get_comment_update(commentId: number, text: string, tipe: ComponentType) {
  const user = await getUserId();
  const comment = await getCommentModel(tipe, commentId);
  if (!comment) return { success: false, message: "Comment not found" };
  if (comment.userId !== user.id) return { success: false, message: "You are not the owner of this comment" };

  const updated = await updateCommentModel(tipe, commentId, text);

  if (tipe === "c" && "countryId" in comment) revalidatePath(`/country/${comment.countryId}`);
  if (tipe === "r" && "regionId" in comment) revalidatePath(`/region/${comment.regionId}`);
  if (tipe === "t" && "takeoffId" in comment) revalidatePath(`/takeoff/${comment.takeoffId}`);
  if (tipe === "l" && "landingId" in comment) revalidatePath(`/landing/${comment.landingId}`);

  return { success: true, message: "Comment updated", data: updated };
}

export async function get_delete_comment(commentId: number, tipe: ComponentType) {
  const user = await getUserId();
  const comment = await getCommentModel(tipe, commentId);
  if (!comment) return { success: false, message: "Comment not found" };
  if (comment.userId !== user.id) return { success: false, message: "You are not allowed to delete this comment" };

  const deleted = await deleteCommentModel(tipe, commentId);

  if (tipe === "c" && "countryId" in comment) revalidatePath(`/country/${comment.countryId}`);
  if (tipe === "r" && "regionId" in comment) revalidatePath(`/region/${comment.regionId}`);
  if (tipe === "t" && "takeoffId" in comment) revalidatePath(`/takeoff/${comment.takeoffId}`);
  if (tipe === "l" && "landingId" in comment) revalidatePath(`/landing/${comment.landingId}`);

  return { success: true, message: "Comment deleted", data: deleted };
}
