"use server"
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function change_name(name: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      redirect("/");
      return { success: false, message: "You are not logged in." };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    if (updatedUser) {
      await prisma.profile.update({
        where: { userId: session.user.id },
        data: { name },
      });
    }

    return { success: true, message: "Name updated successfully." };
<<<<<<< HEAD
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return { success: false, message };
=======
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update name.",
    };
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  }
}
