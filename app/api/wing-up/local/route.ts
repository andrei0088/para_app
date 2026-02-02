import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { communityId, action } = await req.json();
  const userId = session.user.id;

  const community = await prisma.community.findUnique({
    where: { id: Number(communityId) },
  });

  if (!community) {
    return NextResponse.json({ error: "Community not found" }, { status: 404 });
  }

  // 1) JOIN
  if (action === "join") {
    if (community.locals.includes(userId)) {
      return NextResponse.json(
        { error: "You are already a local pilot" },
        { status: 409 },
      );
    }

    await prisma.community.update({
      where: { id: Number(communityId) },
      data: { locals: { push: userId } },
    });

    return NextResponse.json({
      success: true,
      message: "You are now a local pilot",
    });
  }

  // 2) LEAVE
  if (action === "leave") {
    // BLOCK leave if user is the only local pilot
    if (community.locals.length === 1 && community.locals[0] === userId) {
      return NextResponse.json(
        {
          error:
            "You cannot leave because you are the only local pilot. Ask another pilot to become local first.",
        },
        { status: 409 },
      );
    }

    if (!community.locals.includes(userId)) {
      return NextResponse.json(
        { error: "You are not a local pilot" },
        { status: 409 },
      );
    }

    await prisma.community.update({
      where: { id: Number(communityId) },
      data: {
        locals: community.locals.filter((id) => id !== userId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "You are no longer a local pilot",
    });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
