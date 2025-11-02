import { prisma } from "@/app/api/prisma";

export default async function getProfileByUrl(url: string) {
    console.log("url-"+url);
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        url,
        public: true,
      },
    });

    if (!profile) {
      return { success: false, message: "Profile not found or not public" };
    }

    return { success: true, data: profile };
  } catch (err: any) {
    return { success: false, message: err.message || "Unknown error" };
  }
}
