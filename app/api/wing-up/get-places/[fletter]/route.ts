import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fletter: string }> },
) {
  const { fletter } = await params; // ← OBLIGATORIU await

  const countries = await prisma.country.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const regions = await prisma.region.findMany({
    select: { id: true, name: true, countryId: true },
    orderBy: { name: "asc" },
  });

  const regionsByCountryId: Record<string, { id: string; name: string }[]> = {};

  for (const r of regions) {
    (regionsByCountryId[r.countryId] ??= []).push({
      id: r.id.toString(),
      name: r.name,
    });
  }

  const rez: Record<
    string,
    {
      id: string;
      name: string;
      regions: { id: string; name: string }[];
    }[]
  > = {};

  for (const c of countries) {
    const letter = c.name.charAt(0).toUpperCase();

    (rez[letter] ??= []).push({
      id: c.id.toString(),
      name: c.name,
      regions: regionsByCountryId[c.id] ?? [],
    });
  }

  return NextResponse.json(rez[fletter.toUpperCase()] || []);
}
