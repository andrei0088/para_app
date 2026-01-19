import { prisma } from "@/lib/prisma";

export default async function is_admin(id: string) {
  if (!id) return false;

  const user = await prisma.user.findFirst({
    where: { id }, // folosește parametrul 'id'
    select: { userType: true },
  });

  if (user?.userType === "Admin") return true;

  return false;
}
