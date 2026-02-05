import dbConnect from "@/lib/mongodb";
import { prisma } from "@/lib/prisma";
import CountryComment from "@/models/CountryComment";
import LandingComment from "@/models/LandingComment";
import Posts from "@/models/Posts";
import RegionComment from "@/models/RegionComment";
import TakeoffComment from "@/models/TakeoffComment";

export async function is_admin(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { userType: true },
  });
  if (user?.userType !== "Admin") {
    return { isAdmin: false, notifications: 0 };
  }
  await dbConnect();
  const count =
    (await CountryComment.countDocuments({ notified: false })) +
    (await RegionComment.countDocuments({ notified: false })) +
    (await TakeoffComment.countDocuments({ notified: false })) +
    (await LandingComment.countDocuments({ notified: false })) +
    (await Posts.countDocuments({ notified: false })) +
    (await prisma.community.count({ where: { validated: false } }));

  return { isAdmin: true, notifications: count };
}

export async function get_url(id: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId: id, public: true },
    select: { url: true },
  });
  return profile?.url || null;
}
