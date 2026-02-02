import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Posts from "@/models/Posts";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json(
        { success: false, message: "Missing postId" },
        { status: 400 },
      );
    }

    await dbConnect();

    console.log("Session userId:", session.user.id);
    console.log("PostId:", postId);

    const post = await Posts.findById(postId);
    console.log("Post found:", post);
    // 🔒 doar ownerul poate șterge
    const result = await Posts.updateOne(
      {
        _id: postId,
        userId: session.user.id,
        deletedAt: null, // să nu fie deja șters
      },
      {
        $set: { deletedAt: new Date() },
      },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Not allowed or already deleted" },
        { status: 403 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Soft delete error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
