import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as leoProfanity from "leo-profanity";
import dbConnect from "@/lib/mongodb";
import Posts from "@/models/Posts";
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

// ==== Utilitare ====
function validateComment(comment: string): boolean {
  return !leoProfanity.check(comment);
}

export async function POST(req: Request) {
  let post;
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to post." },
        { status: 401 },
      );
    }
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "You must be logged in to post." },
        { status: 401 },
      );
    }
    const { componentId, content } = await req.json();

    // 2️⃣ Date invalide
    if (!componentId || !content || !content.trim()) {
      return NextResponse.json(
        { error: "Invalid post content." },
        { status: 400 },
      );
    }

    // 3️⃣ Verificăm comunitatea + membership
    const community = await prisma.community.findUnique({
      where: { id: Number(componentId) },
      select: { users: true },
    });

    if (!community) {
      return NextResponse.json(
        { error: "Community not found." },
        { status: 404 },
      );
    }

    // users = string[]
    const isMember = community.users.includes(session.user.id);

    if (!isMember) {
      return NextResponse.json(
        { error: "You are not a member of this community." },
        { status: 403 },
      );
    }

    // validate text content
    if (!validateComment(content)) {
      return NextResponse.json(
        { error: "Please avoid offensive language." },
        { status: 400 },
      );
    }

    // 4️⃣ Creăm postarea
    await dbConnect();

    post = await Posts.create({
      userId: session.user.id,
      userName: session.user.name,
      profileId: profile.id,
      componentId,
      message: content,
    });

    const update = await prisma.community.update({
      where: { id: componentId },
      data: { messages: { push: post.id } },
    });

    if (!post || !update) {
      return NextResponse.json(
        {
          error:
            "Your message could not be published due to a temporary server issue. Please try again later.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    if (post?.id) {
      await Posts.findByIdAndDelete(post.id);
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
