"use server";
import { auth } from "@/app/lib/auth";

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
  } catch (e) {
    return { message: "Invalid or expired token." };
  }
}
