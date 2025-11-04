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
<<<<<<< HEAD
export async function signUpAction(prevState: SignUpResult, formData: FormData): Promise<SignUpResult> {
=======
export async function signUpAction(prevState: Record<string, unknown>, formData: FormData): Promise<SignUpResult> {
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  const userData = Object.fromEntries(formData);
  const name = (formData.get("name") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
  const password = (formData.get("password") as string) || "";
  const ckpassword = (formData.get("ckpassword") as string) || "";
  const bdate = (formData.get("bdate") as string) || "";
  const agree = formData.get("agree");
<<<<<<< HEAD

  // VALIDARE
=======
  const MIN_AGE = 18;

  // ===== VALIDARE CLIENT-SIDE =====
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  if (!name) return { text: "Name is required.", user: userData };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) return { text: "A valid email is required.", user: userData };
  if (password !== ckpassword) return { text: "Passwords do not match.", user: userData };
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passRegex.test(password)) return { text: "Password must be ≥ 6 chars, include upper, lower & digit.", user: userData };
  const age = Math.floor((Date.now() - new Date(bdate).getTime()) / 31557600000);
<<<<<<< HEAD
  if (age < 18) return { text: "You must be at least 18 years old.", user: userData };
  if (!agree) return { text: "You must agree to the Terms & Conditions.", user: userData };

  try {
    const result = await auth.api.signUpEmail({ body: { email, password, name } });
    if (!result.user?.id) throw new Error("User ID not found");

    const baseUrl = name.trim().toLowerCase().replace(/\s+/g, "-");
    let url = baseUrl;
    let exists = await prisma.profile.findFirst({ where: { url } });
    while (exists) {
      const rand = Math.floor(Math.random() * 900) + 100;
=======
  if (age < MIN_AGE) return { text: `You must be at least ${MIN_AGE} years old.`, user: userData };
  if (!agree) return { text: "You must agree to the Terms & Conditions.", user: userData };

  try {
    // ===== CREAȚI USER =====
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    if (!result.user?.id) throw new Error("User ID not found after signup");

    const baseUrl = name.trim().toLowerCase().replace(/\s+/g, "-");
    let url = baseUrl;

    // Verifică unicitatea
    let exists = await prisma.profile.findFirst({ where: { url } });

    // Dacă există deja, adaugă un număr aleator de 3 cifre și verifică din nou
    while (exists) {
      const rand = Math.floor(Math.random() * 900) + 100; // 100-999
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
      url = `${baseUrl}${rand}`;
      exists = await prisma.profile.findFirst({ where: { url } });
    }

<<<<<<< HEAD
    await prisma.profile.create({
      data: { userId: result.user.id, bdate: new Date(bdate), url, name },
    });

    return { success: true, email };
=======
    // ===== SALVEAZĂ BDATE =====
    await prisma.profile.create({
      data: {
        userId: result.user.id,
        bdate: new Date(bdate),
        url: url,
        name: name,
      },
    });

    // ===== RETURN SUCCES =====
    return { success: true, email: email };
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Error during signup.";
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
    select: { deletedAt: true },
  });

  if (!user) throw new Error("User with this email does not exist.");
  if (user.deletedAt) throw new Error("Your account has been deactivated. Contact support if this is a mistake.");

  try {
    await auth.api.signInEmail({ body: { email, password } });
    redirect("/");
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Incorrect credentials.";
    throw new Error(errMsg);
  }
}

// ===== SIGN OUT =====
export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
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
    text,
  });
}


