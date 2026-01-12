"use server";
import { prisma } from "@/app/api/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

export default async function sendEmail(
  recipientId: string,
  subject: string,
  message: string
) {
  // verificare user logat
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, message: "User not logged in" };
  }

  // găsim email-ul destinatarului
  const sendTo = await prisma.user.findFirst({
    where: { id: recipientId },
    select: { email: true },
  });

  if (!sendTo?.email) {
    return { success: false, message: "Recipient email not found" };
  }

  // Creăm textul email-ului mai user-friendly
  const mailSubject = `New message from ${session.user.name}: ${subject}`;
  const mailBody = `
    <p>Hello,</p>
    <p>You have received a new message via Para APP from <strong>${session.user.name}</strong>.</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <p>If you want to reply, you can contact them directly at: 
      <a href="mailto:${session.user.email}">${session.user.email}</a>
    </p>
    <p>Best regards,<br/>Para APP Team</p>
  `;

  // Configurare nodemailer folosind variabilele de mediu SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true pentru 465, false pentru altele
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Para APP" <${process.env.SMTP_USER}>`,
      to: sendTo.email,
      subject: mailSubject,
      html: mailBody,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
