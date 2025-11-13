"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import nodemailer from "nodemailer";

interface SignUpResult {
  success?: boolean;
  email?: string;
  text?: string;
  user?: Record<string, unknown>;
}

// ===== SIGN UP =====
export async function signUpAction(
  prevState: SignUpResult,
  formData: FormData
): Promise<SignUpResult> {
  const userData = Object.fromEntries(formData);
  const name = (formData.get("name") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
  const password = (formData.get("password") as string) || "";
  const ckpassword = (formData.get("ckpassword") as string) || "";
  const bdate = (formData.get("bdate") as string) || "";
  const agree = formData.get("agree");

  // VALIDARE
  if (!name) return { text: "Name is required.", user: userData };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email))
    return { text: "A valid email is required.", user: userData };
  if (password !== ckpassword)
    return { text: "Passwords do not match.", user: userData };
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passRegex.test(password))
    return {
      text: "Password must be ≥ 6 chars, include upper, lower & digit.",
      user: userData,
    };
  const age = Math.floor(
    (Date.now() - new Date(bdate).getTime()) / 31557600000
  );
  if (age < 18)
    return { text: "You must be at least 18 years old.", user: userData };
  if (age > 90) {
    return {
      text: "Hmm… that birth date seems unusual. Please enter a valid birth date.",
      user: userData,
    };
  }

  if (!agree)
    return {
      text: "You must agree to the Terms & Conditions.",
      user: userData,
    };
  const userRet = await prisma.user.findFirst({ where: { email: email } });
  if (userRet) redirect(`/user/register/return?name=${name}`);

  try {
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    });
    if (!result.user?.id) throw new Error("User ID not found");

    const baseUrl = name.trim().toLowerCase().replace(/\s+/g, "-");
    let url = baseUrl;
    let exists = await prisma.profile.findFirst({ where: { url } });
    while (exists) {
      const rand = Math.floor(Math.random() * 900) + 100;
      url = `${baseUrl}${rand}`;
      exists = await prisma.profile.findFirst({ where: { url } });
    }

    await prisma.profile.create({
      data: { userId: result.user.id, bdate: new Date(bdate), url, name },
    });

    return { success: true, email };
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Error during signup.";
    return { text: errMsg, user: userData };
  }
}

// ===== RESEND EMAIL VERIFICATION =====
export async function resend_create_mail(email: string) {
  return await auth.api.sendVerificationEmail({
    body: {
      email: email,
      callbackURL: "/",
    },
  });
}

// ===== SIGN IN =====

export async function signInAction(formData: FormData) {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  const user = await prisma.user.findFirst({
    where: { email },
    select: { id: true, deletedAt: true, emailVerified: true },
  });

  if (!user) {
    return {
      success: false,
      text: "The email or password you entered is incorrect.",
    };
  }

  if (user.deletedAt) {
    return {
      success: false,
      text: "This account has been deactivated. If you believe this is a mistake, please contact our support team.",
    };
  }

  if (!user.emailVerified) {
    return {
      success: false,
      text: "validation",
    };
  }

  try {
    await auth.api.signInEmail({ body: { email, password } });
    return { success: true };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message.toLowerCase() : "";

    // Detect password mismatch (adjust if your auth provider uses different wording)
    if (errMsg.includes("invalid") || errMsg.includes("credentials")) {
      return {
        success: false,
        text: "The email or password you entered is incorrect.",
      };
    }

    // Fallback (unknown errors)
    return {
      success: false,
      text: "We couldn’t sign you in right now. Please try again later.",
    };
  }
}

// ===== SIGN OUT =====
export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  console.log("logout");
  redirect("/");
}

export async function signOutAction_after_delete() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/goodbye");
}

// ===== SEND EMAIL (SMTP) =====
interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}
export async function sendEmail({ to, subject, text }: SendEmailProps) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html: text,
  });
}
