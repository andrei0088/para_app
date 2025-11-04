import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
<<<<<<< HEAD
import { prisma } from "../api/prisma"; // ajustează calea dacă e nevoie
import { sendEmail } from "../api/actions/auth"; // ajustează calea

// Tipuri pentru callbacks
type User = {
  id: string;
  email: string;
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
=======
import { sendEmail } from "../api/actions/auth";
import { prisma } from "../api/prisma";

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true, 
    sendResetPassword: async ({user, url, token}, request) => {
      
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `
          Click the link below to reset your password:
          ${url}
        `
      });
    }

  },

  emailVerification: {
    enabled: true, 
    sendVerificationEmail: async ({ user, url, token }, request) => {
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click this link to verify your email: ${url}`,
      });
    },
<<<<<<< HEAD
=======
    // redirectTo aici nu funcționează direct; folosește client-side redirect după login
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  },

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  plugins: [nextCookies()],
<<<<<<< HEAD

  session: {
    // Expira la maxim 7 zile
    expiresIn: 60 * 60 * 24 * 7, // 7 zile în secunde
    // Dacă nu se folosește cookie-ul pentru 36h, expiră automat
    updateAge: 60 * 60 * 36, // 36 ore
  },
=======
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
});
