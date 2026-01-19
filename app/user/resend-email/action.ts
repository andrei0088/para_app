"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function resendValidationEmail(email: string) {
  if (!email) {
    return { succes: false, message: "Please provide a valid email address." };
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
      emailVerified: false,
    },
  });

  if (!user) {
    return {
      succes: false,
      message:
        "No unverified account found for this email. Make sure you registered.",
    };
  }

  const result = await auth.api.sendVerificationEmail({
    body: { email },
  });

  // ✅ verificare corectă
  if (!result.status) {
    return {
      succes: false,
      message:
        "We couldn’t send the verification email. Please try again later.",
    };
  }

  return {
    succes: true,
    message:
      "✅ Verification email sent! Please check your inbox and spam folder.",
  };
}
