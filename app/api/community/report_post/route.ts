import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Posts from "@/models/Posts";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Not logged in" },
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

  const result = await Posts.updateOne(
    { _id: postId, reportedBy: { $ne: userId } }, // un singur raport / user
    {
      $push: { reportedBy: userId },
      $inc: { report: 1 },
    },
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({
      success: true,
      alreadyReported: true,
    });
  }

  return NextResponse.json({
    success: true,
    alreadyReported: false,
  });
}
