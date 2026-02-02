import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const community = await prisma.community.findFirst({
    where: { url: id },
  });

  const type = id[0];
  const identifier = parseInt(id.slice(1));
  if (!community) {
    if (type === "c") {
      const rez = await prisma.country.findFirst({
        where: { id: identifier },
        select: { id: true, name: true },
      });
      return NextResponse.json({
        success: false,
        community: { country: rez, region: null },
      });
    }

    if (id[0] === "r") {
      const region = await prisma.region.findFirst({
        where: { id: parseInt(id.slice(1)) },
        select: { id: true, name: true, countryId: true },
      });

      const country = await prisma.country.findFirst({
        where: { id: region?.countryId },
        select: { id: true, name: true },
      });
      if (!region || !country) throw Error("region or country errror");
      const community = await prisma.community.findUnique({
        where: { url: `c${country.id}` },
      });

      return NextResponse.json({
        success: false,
        community: {
          country: country,
          region: region,
          countryCommunity: community,
        },
      });
    }

    return NextResponse.json(null);
  }

  return NextResponse.json({ success: true, community });
}
