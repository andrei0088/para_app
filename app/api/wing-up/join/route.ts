import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { communityId, action } = await req.json();

  const community = await prisma.community.findUnique({
    where: { id: Number(communityId) },
  });

  if (!community)
    return NextResponse.json({ error: "Community not found" }, { status: 404 });

  if (action === "join") {
    await prisma.community.update({
      where: { id: Number(communityId) },
      data: {
        users: { push: session.user.id },
      },
    });
  } else {
    if (
      community.locals.length === 1 &&
      community.locals[0] == session.user.id
    ) {
      return NextResponse.json(
        {
          error:
            "You are the last local pilot. Leave the community only after another local pilot joins or ask an admin to delete it.",
        },
        { status: 409 },
      );
    }

    await prisma.community.update({
      where: { id: Number(communityId) },
      data: {
        users: community.users.filter((id) => id !== session.user.id),
        locals: community.locals.filter((id) => id !== session.user.id),
      },
    });
  }
  return NextResponse.json({ success: true });
}
