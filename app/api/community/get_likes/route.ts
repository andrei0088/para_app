import { NextRequest, NextResponse } from "next/server";
import { get_likes } from "@/app/community/[id]/action";

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");
    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const data = await get_likes(postId); // { likes, userLogged, userLike }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET /api/community/get_likes error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
