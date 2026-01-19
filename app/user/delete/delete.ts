"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
  } catch (error: unknown) {
    // Verificăm dacă e un obiect de tip Error sau are proprietatea code (Prisma)
    if (error && typeof error === "object") {
      const err = error as { message?: string; code?: string };

      if (err.code) {
        return {
          success: false,
          error: `Database error: ${err.code}`,
          details: err.message ?? "No details",
        };
      }

      return {
        success: false,
        error: "Unexpected error occurred",
        details: err.message ?? "No details",
      };
    }

    // Dacă nu e obiect
    return {
      success: false,
      error: "Unexpected error occurred",
      details: String(error),
    };
  }
}
