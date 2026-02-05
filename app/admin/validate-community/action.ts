import { prisma } from "@/lib/prisma";

export async function validateCommunity() {
  const count = await prisma.community.count({
    where: { validated: false },
  });
  return count;
}

export async function get_community() {
  const rez = await prisma.community.findMany({
    where: { validated: false },
  });
  return rez;
}

export async function validateCommunityById(id: number) {
  const rez = await prisma.community.update({
    where: { id },
    data: { validated: true },
  });
  return rez;
}

export async function deleteCommunityById(id: number) {
  if (!id) {
    throw new Error("ID-ul comunității nu poate fi gol.");
  }

  try {
    const deletedCommunity = await prisma.community.delete({
      where: { id },
    });
    return deletedCommunity;
  } catch (error) {
    console.error("Eroare la ștergerea comunității:", error);
    throw error;
  }
}
