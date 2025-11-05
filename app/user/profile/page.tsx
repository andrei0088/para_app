import { get_my_profile } from "./get_profile";
import ProfileFormsClient from "./ProfileFormsClient";

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

  const sanitizedData = {
    name: data.name,
    url: data.url,
    public: data.public,
    sex: sanitizedSex,
    bio: data.bio ?? null,       // tipul acceptă null
    videos: data.videos ?? undefined, // optional
  };

  return (
    <div className="">
      <ProfileFormsClient initialData={sanitizedData} />
    </div>
  );
}
