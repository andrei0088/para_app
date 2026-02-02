import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, latitude, longitude, allowPM } = await request.json();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: "You are not logged in." },
      { status: 401 },
    );
  }

  // nume unic comunitate
  const nameExists = await prisma.community.findFirst({
    where: { name },
  });

  if (nameExists) {
    return NextResponse.json(
      { success: false, message: "Country already exists." },
      { status: 400 },
    );
  }

  // cate tari custom exista
  const customCountriesCount = await prisma.community.count({
    where: {
      url: {
        startsWith: "c",
      },
      type: "Country",
    },
  });

  // creez tara
  const country = await prisma.community.create({
    data: {
      name,
      url: `cc${customCountriesCount + 1}`,
      type: "Country",
      users: [session.user.id],
      locals: [session.user.id],
      allowPM: allowPM ? [session.user.id] : [],
      latitude,
      longitude,
    },
  });

  return NextResponse.json({
    success: true,
    url: country.url,
  });
}
