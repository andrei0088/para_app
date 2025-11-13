import AddVideo from "./AddVideo";
import ChangeUrl from "./ChangeUrl";
import GeneralData from "./GeneralData";
import { get_my_profile, get_video } from "./get_profile";
import ProfileFormsClient from "./ProfileFormsClient";
import PublicProfile from "./PublicProfile";
import VideoList from "./VideoList";
import ViewAvatar from "./ViewAvatar";

export default async function ProfilePage() {
  const profileRes = await get_my_profile();

  if (!profileRes.success) {
    return (
      <div className="text-center mt-10 text-red-600">
        <strong>Error:</strong> {profileRes.message}
      </div>
    );
  }

  const data = profileRes.data;

  // Convertim sex din orice string | null în "" | "m" | "f"
  let sanitizedSex: "" | "m" | "f" = "";
  if (data.sex === "m" || data.sex === "f") sanitizedSex = data.sex;

  const video = await get_video();

  const profile = {
    id: data.id,
    name: data.name,
    url: data.url,
    public: data.public,
    sex: sanitizedSex,
    bio: data.bio ?? null,
    bdate: data.bdate,
    image: data.image ?? null,
    showAge: data.showAge,
  };
  return (
    <div className="w-full px-7 xl:max-w-7xl xl:mx-auto">
      <GeneralData isPublic={profile.public} url={profile.url} />
      <div className="w-full h-0.5 bg-linear-to-r from-gray-300 via-cyan-500 to-gray-300  rounded-full"></div>

      <div className="w-full flex gap-5 md:flex-row flex-col ">
        <div className="w-full">
          <ViewAvatar image={profile.image} />
          <hr />
          <PublicProfile isPublic={profile.public} />
          <hr />
          <ChangeUrl initialUrl={profile.url} />

          <div className="w-full h-0.5 bg-linear-to-r from-gray-300 via-cyan-500 to-gray-300  rounded-full"></div>

          <ProfileFormsClient initialData={profile} />
        </div>
        <div className="w-full">
          <AddVideo profileId={profile.id} />
          <VideoList videos={video} />
        </div>
      </div>
    </div>
  );
}
