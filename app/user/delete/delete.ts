'use server'
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function delete_user() {
  try {
    // Obține sesiunea curentă
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "User not authenticated" };
    }

    // Soft delete user (setăm deletedAt)
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!updatedUser) {
      return { success: false, error: "Failed to deactivate user" };
    }

    return { success: true, message: "User account has been deactivated" };

  } catch (error: any) {
    // Dacă e o eroare Prisma
    if (error?.code) {
      return { success: false, error: `Database error: ${error.code}`, details: error.message };
    }

    // Alte erori
    return { success: false, error: "Unexpected error occurred", details: error?.message || error };
  }
}
