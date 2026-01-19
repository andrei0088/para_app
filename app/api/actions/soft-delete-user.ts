import { prisma } from "@/lib/prisma";

export async function softDeleteUser(userId: string) {
  // mark user as deleted
  await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() }, // <-- use deletedAt instead of deleted
  });

  // optionally: remove all active sessions for the user
  await prisma.session.deleteMany({
    where: { userId },
  });

  return { success: true, message: "User account has been deactivated." };
}
