import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import PostLikes from "@/models/PostLikes";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ verifică dacă userul e logat
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: 401 },
      );
    }

    // 2️⃣ parsează body JSON
    const body = await req.json();
    const postId = body.postId;
    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    // 3️⃣ conectează la Mongo
    await dbConnect();

    // 4️⃣ verifică dacă userul a dat deja like
    const doc = await PostLikes.findOne({ postId });

    let userLike = false;

    if (doc) {
      if (doc.users.includes(userId)) {
        // User already liked → elimină cu $pull
        await PostLikes.updateOne({ postId }, { $pull: { users: userId } });
        userLike = false;
      } else {
        // User nu a dat like → adaugă cu $addToSet
        await PostLikes.updateOne({ postId }, { $addToSet: { users: userId } });
        userLike = true;
      }
    } else {
      // Nu există document → creează cu user deja like
      await PostLikes.create({ postId, users: [userId] });
      userLike = true;
    }

    // 5️⃣ obține numărul total de like-uri
    const updatedDoc = await PostLikes.findOne({ postId }).lean();
    const likes = updatedDoc?.users.length ?? 0;

    // 6️⃣ return JSON
    return NextResponse.json({
      likes,
      userLogged: true,
      userLike,
    });
  } catch (err) {
    console.error("toggle_like error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
