"use server"
<<<<<<< HEAD
=======
import { success } from "better-auth";
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
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

<<<<<<< HEAD
  } catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
=======
  } catch (err: any) {
    console.error("Eroare la trimiterea emailului:", err);
    return { success: false, error: err.message ?? "Unknown error" };
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  }
}
