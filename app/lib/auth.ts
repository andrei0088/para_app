import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "../api/prisma"; // ajustează calea dacă e nevoie
import { sendEmail } from "../api/actions/auth"; // ajustează calea

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: `Hi ${user.name}, reset your password 🪂`,
        text: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <h2 style="color: #16a34a; margin-bottom: 20px;">Hello ${user.name}!</h2>
      <p style="font-size: 16px; line-height: 1.6;">
        We received a request to reset your password for your account.
        If you didn't request this, you can safely ignore this email.
      </p>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="
          display: inline-block;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          background-color: #16a34a;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.3s;
        " onmouseover="this.style.backgroundColor='#15803d'" onmouseout="this.style.backgroundColor='#16a34a'">
          Reset Password
        </a>
      </p>

      <p style="font-size: 14px; color: #555;">
        If the button above doesn’t work, copy and paste the following link into your browser:
        <br/>
        <a href="${url}" style="color: #1d4ed8; word-break: break-all;">${url}</a>
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="font-size: 12px; color: #999;">
        Thank you for using ParaUP 🪂. If you need help, contact us at:
        <a href="mailto:contact@paragliding-high.eu" style="color: #16a34a;">contact@paragliding-high.eu</a>
      </p>
    </div>
  </div>
`,
      });
    },
  },

  emailVerification: {
    enabled: true,
    callbackURL: "/login",
    tokenMaxAge: 24 * 60 * 60, // 24h în secunde

    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: `Hi ${user.name}! Please verify your email address 🪂`,
        text: ` <div style="font-family: Arial, sans-serif; padding: 20px; color: #222; line-height: 1.6;">
                        <h2 style="margin-bottom: 10px;">Welcome to Paragliding High, ${user.name}! 🪂</h2>
                        <p>We're excited to have you here! Before you can start, we just need to confirm that this is really your email address.</p>
                        <p style="margin: 24px 0;">
                          <a href="${url}user/login/succes" style="background: #16a34a; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                              Verify Email
                          </a>
                        </p>
                        <p>If the button doesn’t work, just click or copy the link below into your browser:</p>
                        <p style="word-break: break-all; color: #1d4ed8;">
                          <a href="${url}user/login/succes" style="color: #1d4ed8;">${url}user/login/succes</a>
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
