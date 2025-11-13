import React from "react";
import getProfileByUrl, { get_profile_video } from "./get_profil";
import { notFound } from "next/navigation";
import ProfileViewClient from "./ProfileViewClient";
import ProfileVideos from "./ProfileVideos";
import ProfileLike from "./ProfileLike";
import ProfileBio from "./ProfileBio";
import PMUser from "./PMUser";

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
    id: Number(rez.data.id),
    sex: rez.data.sex === "m" ? "m" : rez.data.sex === "f" ? "f" : null,
    showAge: rez.data.showAge,
  } as const;
  const videos = await get_profile_video(rez.data.id);
  return (
    <div className="w-full h-full">
      <div className="bg-white    rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 max-w-full w-full mx-auto transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4">
          <div>
            <ProfileViewClient profile={profile} />
            {profile.canPM && (
              <PMUser userId={profile.userId} userName={profile.name} />
            )}
          </div>

          <ProfileBio bio={profile.bio} />

          <ProfileLike profileId={profile.id} />
        </div>
      </div>
      {videos.success ? (
        <ProfileVideos videos={videos.data} />
      ) : (
        "No videos available"
      )}
    </div>
  );
};

export default Page;
