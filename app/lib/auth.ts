import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "../api/prisma"; // ajustează calea dacă e nevoie
import { sendEmail } from "../api/actions/auth"; // ajustează calea

// Tipuri pentru callbacks
type User = {
  id: string;
  email: string;
  name:string;
};

type ResetPasswordParams = {
  user: User;
  url: string;
  token: string;
};

type VerificationParams = {
  user: User;
  url: string;
  token: string;
};

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }: ResetPasswordParams) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link below to reset your password:\n${url}`,
      });
    },
  },

  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }: VerificationParams) => {
      await sendEmail({
        to: user.email,
        subject: `Hi ${user.name}! Please verify your email address 🪂`,
        text:` <div style="font-family: Arial, sans-serif; padding: 20px; color: #222; line-height: 1.6;">
                        <h2 style="margin-bottom: 10px;">Welcome to Paragliding High, ${user.name}! 🪂</h2>
                        <p>We're excited to have you here! Before you can start, we just need to confirm that this is really your email address.</p>
                        <p style="margin: 24px 0;">
                          <a href="${url}" style="background: #16a34a; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                              Verify Email
                          </a>
                        </p>
                        <p>If the button doesn’t work, just click or copy the link below into your browser:</p>
                        <p style="word-break: break-all; color: #1d4ed8;">
                          <a href="${url}" style="color: #1d4ed8;">${url}</a>
                         </p>

                         <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
                        <p style="font-size: 14px; color: #555;">
                          If you didn’t create an account, you can safely ignore this email.
                          <br /><br />
                          If you need help, we’re here for you — contact us at:
                          <br />
                          <a href="mailto:contact@paragliding-high.eu" style="color:#16a34a;">contact@paragliding-high.eu</a>
                        </p>
                      </div>`,
      });
    },
  },

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  plugins: [nextCookies()],

  session: {
    // Expira la maxim 7 zile
    expiresIn: 60 * 60 * 24 * 7, // 7 zile în secunde
    // Dacă nu se folosește cookie-ul pentru 36h, expiră automat
    updateAge: 60 * 60 * 36, // 36 ore
  },
});
