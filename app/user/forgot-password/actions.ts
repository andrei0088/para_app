"use server";
import { auth } from "@/app/lib/auth";

export async function sendResetEmail(email: string) {
  const result = await auth.api.requestPasswordReset({
    body: { email, redirectTo: "/user/reset" },
    method: "POST",
  });
  return result;
}
