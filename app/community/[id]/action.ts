import dbConnect from "@/lib/mongodb";
import Posts from "@/models/Posts";
import PostLikes from "@/models/PostLikes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function get_posts(id: number) {
  await dbConnect();

  const messages = await Posts.find({
    componentId: id,
    deletedAt: null,
    report: { $lt: 7 },
  }).sort({ createdAt: -1 });

  // Adaugă profileUrl pentru fiecare mesaj
  const messagesWithProfile = await Promise.all(
    messages.map(async (m) => {
      const profile = await prisma.profile.findUnique({
        where: { id: m.profileId },
        select: { url: true },
      });

      // Crează un obiect nou sau modifică direct mesajul
      return {
        ...m.toObject(), // dacă folosești Mongoose
        profileUrl: profile?.url || null,
      };
    }),
  );

  if (messagesWithProfile.length === 0) {
    return { succes: false, messages: [] };
  }

  return { succes: true, messages: messagesWithProfile };
}

export async function get_likes(postId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  await dbConnect();

  const rez = await PostLikes.findOne({ postId }).lean();

  const users: string[] = rez?.users ?? [];
  const userId = session?.user?.id;

  return {
    likes: users.length,
    userLogged: !!userId,
    userLike: userId ? users.includes(userId) : false,
  };
}

export async function get_raport(postId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { logdin: false, owner: false, message: null };
  const post = await Posts.findById(postId).select("userId message").lean();
  if (post?.userId === session.user.id)
    return { logdin: true, owner: true, message: post.message };
  else return { logdin: true, owner: false, message: null };
}
