"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function returnUser(email: string, name: string) {
  const deletedUser = await prisma.user.findFirst({
    where: { email, deletedAt: { not: null } },
  });

  if (!deletedUser)
    return { success: false, reason: "User not found or already active" };

  // Better Auth va apela automat sendResetPassword când apelezi requestPasswordReset
  let emailSent = false;
  try {
    await auth.api.requestPasswordReset({
      body: { email, redirectTo: "/user/reset" },
      method: "POST",
    });
    emailSent = true;
  } catch (error) {
    console.error("Failed to send reset email:", error);
  }

  let activated = false;
  if (emailSent) {
    const updated = await prisma.user.update({
      where: { id: deletedUser.id },
      data: { deletedAt: null, name: name },
    });
    activated = !!updated;
  }

  return {
    success: activated && emailSent,
    emailSent,
    activated,
  };
}
