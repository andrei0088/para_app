import React from "react";
import { get_video_like } from "./get_profil";
import VideoLikeClient from "./VideoLikeClient";

type ProfileLikeProps = {
  videoId: number;
};

const ProfileLike = async ({ videoId }: ProfileLikeProps) => {
  const rez = await get_video_like(videoId);

  if (!rez.success) return <div>Error</div>;

  return (
    <VideoLikeClient
      like={rez.data ?? 0} // numărul de "parapane"
      userLiked={rez.userLiked ?? false}
      logd={rez.logd ?? false}
      videoId={videoId} // id-ul profilului
    />
  );
};

export default ProfileLike;
