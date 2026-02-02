import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Posts from "@/models/Posts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ verificăm userul logat
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You are not logged in." },
        { status: 401 },
      );
    }
    const userId = session.user.id;

    // 2️⃣ citim body-ul
    const body = await req.json();
    const { postId, message } = body;
    if (!postId || !message) {
      return NextResponse.json(
        { success: false, message: "Missing postId or message" },
        { status: 400 },
      );
    }

    await dbConnect();

    // 3️⃣ verificăm că userul e proprietar și facem update
    const post = await Posts.findOne({ _id: postId, userId });
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found or not owner" },
        { status: 403 },
      );
    }

    post.message = message;
    await post.save();

    return NextResponse.json({ success: true, message: "Post updated" });
  } catch (err) {
    console.error("edit_post error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
