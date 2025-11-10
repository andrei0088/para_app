import React from "react";
import { get_profile_like } from "./get_profil";
import ProfileLikeClient from "./ProfileLikeClient";

type ProfileLikeProps = {
  profileId: number;
};

const ProfileLike = async ({ profileId }: ProfileLikeProps) => {
  const rez = await get_profile_like(profileId);

  if (!rez.success) return <div>Error</div>;

  return (
    <ProfileLikeClient
      like={rez.data ?? 0} // numărul de "parapane"
      userLiked={rez.userLiked ?? false}
      logd={rez.logd ?? false}
      profileId={profileId} // id-ul profilului
    />
  );
};

export default ProfileLike;
