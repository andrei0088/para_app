"use server";

import nodemailer from "nodemailer";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const CONTACT_EMAIL = "contact@paragliding-high.eu";

export async function contactForm(formData: ContactFormData) {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    throw new Error("All fields are required.");
  }

  // Configurație SMTP
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
    from: `"${name}" <${email}>`,
    to: CONTACT_EMAIL,
    subject: `New Contact Message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p style="margin-top: 12px;"><strong>Message:</strong><br/>${message}</p>
    `,
  });

  return { success: true };
}
