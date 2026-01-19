"use server";
import { auth } from "@/lib/auth";

export async function change_password(formData: FormData) {
  const token = formData.get("token") as string;
  const newPassword = formData.get("password") as string;

  if (!token) return { message: "Invalid token." };

  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });

    return { message: "success" };
  } catch (error: unknown) {
    // Dacă error este un Error, returnează mesajul ei
    if (error instanceof Error) {
      return { message: error.message };
    }
    // Altfel, returnează un mesaj generic
    return { message: "Invalid or expired token." };
  }
}
