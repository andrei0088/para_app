import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // 1. Țări standard
  const countries = await prisma.country.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  // 2. Țări "custom" din comunități validate
  const customCountries = await prisma.community.findMany({
    where: { validated: true },
    select: { id: true, url: true, name: true },
  });

  // 3. Regiuni
  const regions = await prisma.region.findMany({
    select: { id: true, name: true, countryId: true },
    orderBy: { name: "asc" },
  });

  // 4. Grupăm regiunile după countryId
  const regionsByCountryId: Record<string, { id: string; name: string }[]> = {};
  for (const r of regions) {
    (regionsByCountryId[r.countryId] ??= []).push({
      id: r.id.toString(),
      name: r.name,
    });
  }

  // 5. Rezultat final: grupat după prima literă
  const result: Record<
    string,
    {
      id: string;
      name: string;
      url?: string;
      regions: { id: string; name: string }[];
    }[]
  > = {};

  // 5a. Țări normale
  for (const c of countries) {
    const letter = c.name.charAt(0).toUpperCase();
    (result[letter] ??= []).push({
      id: c.id.toString(),
      name: c.name,
      regions: regionsByCountryId[c.id] ?? [],
    });
  }

  // 5b. Țări custom
  for (const cc of customCountries) {
    const letter = cc.name.charAt(0).toUpperCase();
    (result[letter] ??= []).push({
      id: cc.id.toString(),
      name: cc.name,
      url: cc.url || undefined,
      regions: [],
    });
  }

  // 6. Sortăm literele (opțional)
  const sortedResult: Record<string, (typeof result)[string]> = {};
  Object.keys(result)
    .sort()
    .forEach((key) => {
      sortedResult[key] = result[key];
    });

  return NextResponse.json(sortedResult);
}
