'use server'
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
<<<<<<< HEAD
=======
import { redirect } from "next/navigation";
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

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

<<<<<<< HEAD
  } catch (error: unknown) {
  // Verificăm dacă e un obiect de tip Error sau are proprietatea code (Prisma)
  if (error && typeof error === "object") {
    const err = error as { message?: string; code?: string };

    if (err.code) {
      return { success: false, error: `Database error: ${err.code}`, details: err.message ?? "No details" };
    }

    return { success: false, error: "Unexpected error occurred", details: err.message ?? "No details" };
  }

  // Dacă nu e obiect
  return { success: false, error: "Unexpected error occurred", details: String(error) };
}

=======
  } catch (error: any) {
    // Dacă e o eroare Prisma
    if (error?.code) {
      return { success: false, error: `Database error: ${error.code}`, details: error.message };
    }

    // Alte erori
    return { success: false, error: "Unexpected error occurred", details: error?.message || error };
  }
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
}
