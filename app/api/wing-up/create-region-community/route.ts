import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { number } from "better-auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const RADIUS_KM = 10;
  const DEGREE_KM = 111;
  const delta = RADIUS_KM / DEGREE_KM;

  const { name, latitude, longitude, allowPM, countryId, countryName } =
    await request.json();
  const session = await auth.api.getSession({ headers: await headers() });

  //   User logat
  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: "You are not logged in." },
      { status: 401 },
    );
  }

  //   nume unic
  const name_exist = await prisma.region.findFirst({
    where: { name: name },
  });
  if (name_exist) {
    return NextResponse.json("Country name already exists.", { status: 400 });
  }

  //   nu e aproape de alta tara

  const nearbyRegion = await prisma.region.findFirst({
    where: {
      latitude: {
        gte: latitude - delta,
        lte: latitude + delta,
      },
      longitude: {
        gte: longitude - delta,
        lte: longitude + delta,
      },
    },
  });

  if (nearbyRegion) {
    return NextResponse.json(
      {
        success: false,
        message: "A country already exists near these coordinates.",
        nearbyRegion,
      },
      { status: 400 },
    );
  }

  //   exista comunitatea cu acest nume

  const communityNameExists = await prisma.community.findFirst({
    where: { name: name },
  });
  if (communityNameExists) {
    return NextResponse.json(
      { success: false, message: "A community with this name already exists." },
      { status: 400 },
    );
  }

  //   cate comunitati custom exista
  const customCountryCommunitiesCount = await prisma.community.count({
    where: {
      url: {
        startsWith: "cr",
      },
    },
  });

  // creez region community
  const rez = await prisma.community.create({
    data: {
      name: name,
      url: `cr${customCountryCommunitiesCount + 1}`,
      type: "Region",
      users: [session.user.id],
      locals: [session.user.id],
      allowPM: allowPM ? [session.user.id] : [],
      countryId: countryId,
      countryName: countryName,
      longitude: longitude,
      latitude: latitude,
    },
  });

  // exista comunitate pe tara

  const countryCommunity = await prisma.community.findUnique({
    where: { url: countryId },
  });
  const numericId = Number(countryId.replace(/\D/g, "")); // scoate tot ce nu e cifră

  const countryGPS = await prisma.country.findUnique({
    where: { id: numericId },
    select: { longitude: true, latitude: true },
  });
  if (!countryGPS)
    return NextResponse.json(
      { success: false, message: "Failed get country" },
      { status: 501 },
    );
  if (!countryCommunity) {
    const createCountry = await prisma.community.create({
      data: {
        name: countryName,
        url: countryId,
        type: "Country",
        users: [session.user.id],
        locals: [session.user.id],
        allowPM: allowPM ? [session.user.id] : [],
        regions: [rez.id],
        longitude: Number(countryGPS.longitude),
        latitude: Number(countryGPS.latitude),
      },
    });
  } else {
    const undateCountry = await prisma.community.update({
      where: { id: countryId },
      data: {
        regions: { push: rez.id },
      },
    });
  }

  if (rez) return NextResponse.json({ success: true, url: rez.url });
  else
    return NextResponse.json(
      { success: false, message: "Failed to create community" },
      { status: 500 },
    );
}
