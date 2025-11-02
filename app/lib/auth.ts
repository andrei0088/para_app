import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
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
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click this link to verify your email: ${url}`,
      });
    },
    // redirectTo aici nu funcționează direct; folosește client-side redirect după login
  },

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  plugins: [nextCookies()],
});
