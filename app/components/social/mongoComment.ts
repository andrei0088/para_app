"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import * as leoProfanity from "leo-profanity";
import { prisma } from "@/lib/prisma";
import dbConnect from "@/lib/mongodb";
import CountryComment from "@/models/CountryComment";
import RegionComment from "@/models/RegionComment";
import LandingComment from "@/models/LandingComment";
import TakeoffComment from "@/models/TakeoffComment";
import { use } from "react";
import succes from "@/app/user/login/succes/page";

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

// ==== Tipuri ====
type ComponentType = "c" | "r" | "t" | "l";

interface UserResult {
  success: boolean;
  id: string | null;
  name: string | null;
  message?: string;
}

// ==== Utilitare ====
function validateComment(comment: string): boolean {
  return !leoProfanity.check(comment);
}

async function getUserId(): Promise<UserResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user)
      return { success: false, message: "Not logged in", id: null, name: null };
    return { success: true, id: session.user.id, name: session.user.name };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error retrieving session";
    return { success: false, message, id: null, name: null };
  }
}

// ==== Obține comentarii ====
export async function get_country_comment({ id }: { id: number }) {
  const user = await getUserId();
  dbConnect();
  const comments = await CountryComment.find({
    countryId: id,
    deletedAt: null,
    report: { $lt: 7 },
  })
    .sort({ createdAt: -1 })
    .lean();
  if (!comments) return null;
  const safeComments = comments.map((c) => ({
    id: c._id.toString(),
    userId: c.userId,
    userName: c.userName,
    componentId: c.countryId,
    profileId: c.profileId,
    comment: c.comment,
    report: c.report,
    reportedBy: c.reportedBy,
    deletedAt: c.deletedAt ? c.deletedAt.toISOString() : null,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));
  return {
    user: {
      id: user.id || null,
      name: user.name || null,
      success: user.success || false,
      message: user.message || null,
    },
    comments: safeComments,
  };
}

export async function get_region_comment({ id }: { id: number }) {
  const user = await getUserId();
  dbConnect();
  const comments = await RegionComment.find({
    regionId: id,
    deletedAt: null,
    report: { $lt: 7 },
  })
    .sort({ createdAt: -1 })
    .lean();
  const safeComments = comments.map((c) => ({
    id: c._id.toString(),
    userId: c.userId,
    userName: c.userName,
    componentId: c.regionId,
    profileId: c.profileId,
    comment: c.comment,
    report: c.report,
    reportedBy: c.reportedBy,
    deletedAt: c.deletedAt ? c.deletedAt.toISOString() : null,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return {
    user: {
      id: user.id || null,
      name: user.name || null,
      success: user.success || false,
      message: user.message || null,
    },
    comments: safeComments,
  };
}

export async function get_takeoff_comment({ id }: { id: number }) {
  const user = await getUserId();
  dbConnect();
  const comments = await TakeoffComment.find({
    takeoffId: id,
    deletedAt: null,
    report: { $lt: 7 },
  })
    .sort({ createdAt: -1 })
    .lean();
  const safeComments = comments.map((c) => ({
    id: c._id.toString(),
    userId: c.userId,
    componentId: c.takeoffId,
    profileId: c.profileId,
    userName: c.userName,
    comment: c.comment,
    report: c.report,
    reportedBy: c.reportedBy,
    deletedAt: c.deletedAt ? c.deletedAt.toISOString() : null,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return {
    user: {
      id: user.id || null,
      name: user.name || null,
      success: user.success || false,
      message: user.message || null,
    },
    comments: safeComments,
  };
}

export async function get_landing_comment({ id }: { id: number }) {
  const user = await getUserId();
  dbConnect();
  const comments = await LandingComment.find({
    landingId: id,
    deletedAt: null,
    report: { $lt: 7 },
  })
    .sort({ createdAt: -1 })
    .lean();
  const safeComments = comments.map((c) => ({
    id: c._id.toString(),
    userId: c.userId,
    componentId: c.landingId,
    profileId: c.profileId,
    userName: c.userName,
    comment: c.comment,
    report: c.report,
    reportedBy: c.reportedBy,
    deletedAt: c.deletedAt ? c.deletedAt.toISOString() : null,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return {
    user: {
      id: user.id || null,
      name: user.name || null,
      success: user.success || false,
      message: user.message || null,
    },
    comments: safeComments,
  };
}

// ==== Adaugă comentariu ====
export async function add_comment(
  component: ComponentType,
  componentId: number,
  comment: string
) {
  if (!comment.trim())
    return { success: false, message: "Comment cannot be empty." };
  if (!validateComment(comment))
    return { success: false, message: "Please avoid offensive language." };
  if (comment.length > 1000)
    return {
      success: false,
      message: "Comment is too long. Maximum 1000 characters allowed.",
    };

  const user = await getUserId();
  if (!user.success || !user.id)
    return { success: false, message: "You must be logged in to comment." };

  const profileId = await prisma.profile.findFirst({
    where: { userId: user.id },
    select: { id: true, name: true },
  });
  if (!profileId?.id) return;
  // aici adaugam

  await dbConnect();
  let commentCreated;
  try {
    switch (component) {
      case "c":
        commentCreated = await CountryComment.create({
          userId: user.id,
          profileId: profileId.id,
          userName: profileId.name,
          countryId: componentId,
          comment,
        });
        prisma.country.update({
          where: { id: componentId },
          data: {
            comments: {
              push: commentCreated._id.toString(),
            },
          },
        });
        prisma.user.update({
          where: { id: user.id },
          data: { countryComments: { push: commentCreated._id.toString() } },
        });
        revalidatePath(`/country/${componentId}`);
        break;
      case "r":
        commentCreated = await RegionComment.create({
          userId: user.id,
          profileId: profileId.id,
          userName: profileId.name,
          regionId: componentId,
          comment,
        });
        prisma.region.update({
          where: { id: componentId },
          data: {
            comments: {
              push: commentCreated._id.toString(),
            },
          },
        });
        prisma.user.update({
          where: { id: user.id },
          data: { regionComments: { push: commentCreated._id.toString() } },
        });
        revalidatePath(`/region/${componentId}`);
        break;
      case "t":
        await TakeoffComment.create({
          userId: user.id,
          profileId: profileId.id,
          userName: profileId.name,
          takeoffId: componentId,
          comment,
        });
        revalidatePath(`/takeoff/${componentId}`);
        break;
      case "l":
        await LandingComment.create({
          userId: user.id,
          profileId: profileId.id,
          userName: profileId.name,
          landingId: componentId,
          comment,
        });
        revalidatePath(`/landing/${componentId}`);
        break;
      default:
        return { success: false, message: "Invalid component type." };
    }
    return { success: true, message: "Comment added successfully." };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add comment.";
    return { success: false, message };
  }
}

// ==== Editare și ștergere comentariu ====
async function getCommentModel(component: ComponentType, id: string) {
  switch (component) {
    case "c":
      return CountryComment.findById(id);
    case "r":
      return RegionComment.findById(id);
    case "t":
      return TakeoffComment.findById(id);
    case "l":
      return LandingComment.findById(id);
  }
}

async function updateCommentModel(
  component: ComponentType,
  id: string,
  text: string
) {
  switch (component) {
    case "c":
      return CountryComment.findByIdAndUpdate(
        id,
        { comment: text },
        { new: true }
      );
    case "r":
      return RegionComment.findByIdAndUpdate(
        id,
        { comment: text },
        { new: true }
      );
    case "t":
      return TakeoffComment.findByIdAndUpdate(
        id,
        { comment: text },
        { new: true }
      );
    case "l":
      return LandingComment.findByIdAndUpdate(
        id,
        { comment: text },
        { new: true }
      );
  }
}

async function deleteCommentModel(component: ComponentType, id: string) {
  switch (component) {
    case "c":
      return CountryComment.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
    case "r":
      return RegionComment.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
    case "t":
      return TakeoffComment.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
    case "l":
      return LandingComment.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  }
}

export async function get_comment_update(
  commentId: string,
  text: string,
  tipe: ComponentType
) {
  const user = await getUserId();
  const comment = await getCommentModel(tipe, commentId);
  if (!comment) return { success: false, message: "Comment not found" };
  if (comment.userId !== user.id)
    return { success: false, message: "You are not the owner of this comment" };

  const updated = await updateCommentModel(tipe, commentId, text);

  if (tipe === "c" && "countryId" in comment)
    revalidatePath(`/country/${comment.countryId}`);
  if (tipe === "r" && "regionId" in comment)
    revalidatePath(`/region/${comment.regionId}`);
  if (tipe === "t" && "takeoffId" in comment)
    revalidatePath(`/takeoff/${comment.takeoffId}`);
  if (tipe === "l" && "landingId" in comment)
    revalidatePath(`/landing/${comment.landingId}`);

  return { success: true, message: "Comment updated", data: updated };
}

export async function get_delete_comment(
  commentId: string,
  tipe: ComponentType
) {
  const user = await getUserId();
  const comment = await getCommentModel(tipe, commentId);
  if (!comment) return { success: false, message: "Comment not found" };
  if (comment.userId !== user.id)
    return {
      success: false,
      message: "You are not allowed to delete this comment",
    };

  const deleted = await deleteCommentModel(tipe, commentId);

  if (tipe === "c" && "countryId" in comment)
    revalidatePath(`/country/${comment.countryId}`);
  if (tipe === "r" && "regionId" in comment)
    revalidatePath(`/region/${comment.regionId}`);
  if (tipe === "t" && "takeoffId" in comment)
    revalidatePath(`/takeoff/${comment.takeoffId}`);
  if (tipe === "l" && "landingId" in comment)
    revalidatePath(`/landing/${comment.landingId}`);

  return { success: true, message: "Comment deleted", data: deleted };
}

// ==== Raport comentariu ====

// de adaugat userul la arry

export async function raport_comment({
  id,
  tipe,
}: {
  id: string;
  tipe: ComponentType;
}) {
  const user = await getUserId();
  if (!user.id) return null; // dacă nu e logat, nu raportăm
  const userId = user.id;

  let current;
  if (tipe === "c") current = await CountryComment.findById(id);

  if (tipe === "r") current = await RegionComment.findById(id);
  if (tipe === "t") current = await TakeoffComment.findById(id);
  if (tipe === "l") current = await LandingComment.findById(id);

  if (!current) return null;

  // verificăm dacă userul a raportat deja
  if (current.reportedBy.includes(userId)) {
    return current.reportedBy.length; // nu facem nimic, doar returnăm numărul de raportări
  }

  const newReportedBy = [...current.reportedBy, userId];
  const updateData = {
    reportedBy: newReportedBy,
    report: newReportedBy.length,
  };

  // facem update-ul în baza de date
  if (tipe === "c")
    await CountryComment.findByIdAndUpdate(id, updateData, { new: true });
  if (tipe === "r")
    await RegionComment.findByIdAndUpdate(id, updateData, { new: true });
  if (tipe === "t")
    await TakeoffComment.findByIdAndUpdate(id, updateData, { new: true });
  if (tipe === "l")
    await LandingComment.findByIdAndUpdate(id, updateData, { new: true });

  // revalidare path dacă numărul raportărilor > 5
  if (newReportedBy.length > 5) {
    const pathMap: Record<ComponentType, string> = {
      c: "/country",
      r: "/region",
      t: "/takeoff",
      l: "/landing",
    };
    revalidatePath(pathMap[tipe]);
  }

  return newReportedBy.length; // returnăm numărul actual de raportări
}

// ==== Comentarii raportate (raport > 0) ====
export default async function raported_comment() {
  const country = await CountryComment.find({ report: { $ne: 0 } });

  const region = await RegionComment.find({ report: { $ne: 0 } });
  const takeoff = await TakeoffComment.find({ report: { $ne: 0 } });
  const landing = await LandingComment.find({ report: { $ne: 0 } });

  return {
    country: country.length > 0 ? country : null,
    region: region.length > 0 ? region : null,
    takeoff: takeoff.length > 0 ? takeoff : null,
    landing: landing.length > 0 ? landing : null,
  };
}
