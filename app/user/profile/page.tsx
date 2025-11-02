import { get_my_profile } from "./get_profile";
import ProfileFormsClient from "./ProfileFormsClient";

export default async function ProfilePage() {
  // Server-side logic
  const profileRes = await get_my_profile();

  if (!profileRes.success) {
    return (
      <div className="text-center mt-10 text-red-600">
        <strong>Error:</strong> {profileRes.message}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <ProfileFormsClient initialData={profileRes.data} />
    </div>
  );
}
