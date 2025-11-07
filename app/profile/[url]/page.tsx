import React from "react";
import getProfileByUrl from "./get_profil";
import { notFound } from "next/navigation";
import ProfileViewClient from "./ProfileViewClient";
import ProfileVideos from "./ProfileVideos";

interface PageProps {
  params: { url: string };
}

const Page = async ({ params }: PageProps) => {
   const paramsUrl = await params;
  const url = paramsUrl.url;
  const rez = await getProfileByUrl(url);

  if (!rez.success || !rez.data) notFound();

  // ✅ Mapare strictă a sex-ului
  const profile = {
    ...rez.data,
    sex:
      rez.data.sex === "m"
        ? "m"
        : rez.data.sex === "f"
        ? "f"
        : null, // orice alt string devine null
  } as const; // forțează TS să recunoască tipul literal

  // const videos = rez.data.videos ?? [];
  return (
    <div className="w-full h-full">
      <ProfileViewClient profile={profile}  />
      {/* <ProfileVideos videos={videos} /> */}
    </div>
  );
};

export default Page;
