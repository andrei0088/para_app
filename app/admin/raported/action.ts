import dbConnect from "@/lib/mongodb";
import { prisma } from "@/lib/prisma";
import CountryComment from "@/models/CountryComment";
import LandingComment from "@/models/LandingComment";
import Posts from "@/models/Posts";
import RegionComment from "@/models/RegionComment";
import TakeoffComment from "@/models/TakeoffComment";

const query = {
  report: { $ne: 0 },
  deletedAt: null,
};

// GET reports
export async function get_country_report() {
  await dbConnect();
  return await CountryComment.find(query);
}

export async function get_region_report() {
  await dbConnect();
  return await RegionComment.find(query);
}

export async function get_takeoff_report() {
  await dbConnect();
  return await TakeoffComment.find(query);
}

export async function get_landing_report() {
  await dbConnect();
  return await LandingComment.find(query);
}

export async function get_posts_report() {
  await dbConnect();
  return await Posts.find(query);
}

// DELETE reports
export async function delete_country_report(id: string) {
  await dbConnect();
  return await CountryComment.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true },
  );
}

export async function delete_region_report(id: string) {
  await dbConnect();
  return await RegionComment.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true },
  );
}

export async function delete_takeoff_report(id: string) {
  await dbConnect();
  return await TakeoffComment.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true },
  );
}

export async function delete_landing_report(id: string) {
  await dbConnect();
  return await LandingComment.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true },
  );
}

export async function delete_posts_report(id: string) {
  await dbConnect();
  return await Posts.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true },
  );
}

export async function get_post_url(postsId?: number) {
  if (!postsId) return null; // dacă nu există, returnăm null

  const rez = await prisma.community.findUnique({
    where: { id: postsId }, // id trebuie să fie definit
    select: { url: true },
  });
  console.log({ rez });
  return rez?.url ?? null;
}

export async function erese_notification(id: string, type: string) {
  if (!id || !type) return null;
  await dbConnect();
  if (type == "c")
    return await CountryComment.findByIdAndUpdate(
      id,
      { notified: true },
      { new: true },
    );
  if (type == "r")
    return await RegionComment.findByIdAndUpdate(
      id,
      { notified: true },
      { new: true },
    );
  if (type == "t")
    return await TakeoffComment.findByIdAndUpdate(
      id,
      { notified: true },
      { new: true },
    );
  if (type == "l")
    return await LandingComment.findByIdAndUpdate(
      id,
      { notified: true },
      { new: true },
    );
  if (type == "p")
    return await Posts.findByIdAndUpdate(id, { notified: true }, { new: true });
  return null;
}
