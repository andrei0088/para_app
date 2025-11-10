import { prisma } from "@/app/api/prisma";

export default async function deleteExpiredUnverifiedUsers() {
  const expiredUsers = await prisma.user.findMany({
    where: {
      emailVerified: false,
      createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // 24h
    },
  });

  await prisma.user.deleteMany({
    where: { id: { in: expiredUsers.map((u) => u.id) } },
  });
}
