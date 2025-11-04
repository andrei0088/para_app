import { prisma } from "@/app/api/prisma";

export default async function getProfileByUrl(url: string) {
<<<<<<< HEAD
  console.log("url-" + url);
=======
    console.log("url-"+url);
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
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
<<<<<<< HEAD
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return { success: false, message };
=======
  } catch (err: any) {
    return { success: false, message: err.message || "Unknown error" };
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  }
}
