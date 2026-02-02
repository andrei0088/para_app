"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function createCountryCommunity(formData: FormData) {
  const type = formData.get("type");
  const id = Number(formData.get("id"));
  const allowPM = formData.get("allowPM") === "on";
  const createCountry = formData.get("countryCommunity") === "on";

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("You are not logged in.");
  }
  // country
  if (type === "c") {
    const country = await prisma.country.findUnique({ where: { id } });
    if (!country) throw new Error("Country not exists.");

    const communityData: Prisma.CommunityCreateInput = {
      name: country.name,
      url: `c${id}`,
      type: "Country",
      users: [session.user.id],
      locals: [session.user.id],
      validated: true,
      ...(allowPM && { allowPM: [session.user.id] }),
      latitude: Number(country.latitude),
      longitude: Number(country.latitude),
    };

    const rez = await prisma.community.create({
      data: communityData,
    });

    if (rez) return redirect(`/community/c${id}`);
  }
  // regiune
  if (type === "r") {
    const region = await prisma.region.findUnique({
      where: { id },
      select: { name: true, countryId: true, latitude: true, longitude: true },
    });
    if (!region) return notFound();
    const country = await prisma.country.findUnique({
      where: { id: region.countryId },
      select: { id: true, name: true, latitude: true, longitude: true },
    });
    if (!country) return notFound();
    const community: Prisma.CommunityCreateInput = {
      name: region.name,
      url: `r${id}`,
      type: "Region",
      users: [session.user.id],
      locals: [session.user.id],
      validated: true,
      ...(allowPM && { allowPM: [session.user.id] }),
      countryId: `c${country.id}`,
      countryName: country.name,
      latitude: region.latitude ?? 0,
      longitude: region.latitude ?? 0,
    };
    const rez = await prisma.community.create({ data: community });
    if (rez) {
      if (createCountry) {
        const create = await prisma.community.create({
          data: {
            name: country.name,
            url: `c${country.id}`,
            type: "Country",
            users: [session.user.id],
            locals: [session.user.id],
            validated: true,
            ...(allowPM && { allowPM: [session.user.id] }),
            regions: [rez.id],
            latitude: country.latitude ?? 0,
            longitude: country.longitude ?? 0,
          },
        });
        if (create) return redirect(`/community/${rez.url}`);
        else throw Error("update faild");
      } else {
        const update = await prisma.community.update({
          where: { url: `c${country.id}` },
          data: {
            regions: {
              push: rez.id,
            },
          },
        });
        if (update) return redirect(`/community/${rez.url}`);
        else throw Error("update faild");
      }
    } else throw Error("create faild");
  }
  return notFound();
}
