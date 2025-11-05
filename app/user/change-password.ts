"use server";

import { auth } from "../lib/auth";
import { headers } from "next/headers";

export default async function change_password(formData: FormData) {
  const oldPassword = formData.get("oldPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!oldPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "All fields are required." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!validRegex.test(newPassword)) {
    return {
      success: false,
      message:
        "Password must contain uppercase, lowercase, number & minimum 6 characters.",
    };
  }

  try {
    // Obținem headers și transformăm într-un obiect simplu
    const nextHeaders = await headers();
    const headersObj: Record<string, string> = {};
    nextHeaders.forEach((value: string, key: string) => {
      headersObj[key] = value;
    });

    // Apelăm API-ul pentru schimbarea parolei
    await auth.api.changePassword({
      body: {
        currentPassword: oldPassword,
        newPassword: newPassword,
        revokeOtherSessions: true,
      },
      headers: headersObj,
    });

    return { success: true, message: "✅ Password updated successfully!" };
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return { success: false, message };
  
  }
}
