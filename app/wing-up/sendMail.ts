"use server"
import nodemailer from "nodemailer";

export default async function send_email(name: string, email: string, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true dacă folosești 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const text = `De la: ${name}\nEmail: ${email}\nMesaj:\n${message}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "contact@paragliding-high.eu",
      subject: "Contact Form",
      text,
    });

    return { success: true };

  } catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
}
