"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/lib/auth";

interface ResendEmailClientProps {
  email: string;
}

export default function ResendEmailClient({ email }: ResendEmailClientProps) {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!email) return;

    const resendEmail = async () => {
      try {
        await auth.api.sendVerificationEmail({
          body: { email, callbackURL: "/" },
        });

        setMessage("✅ Verification email sent successfully!");
      } catch (error: unknown) {
        let errorMessage = "❌ Error sending verification email";
        if (error instanceof Error) {
          errorMessage += `: ${error.message}`;
        }
        setMessage(errorMessage);
      }
    };

    resendEmail();
  }, [email]);

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Resending Verification Email</h1>
      {email ? (
        <>
          <p>Verification email is being sent to:</p>
          <p className="font-semibold">{email}</p>
        </>
      ) : (
        <p className="text-red-600">No email provided.</p>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
