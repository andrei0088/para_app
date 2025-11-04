<<<<<<< HEAD
import ResendEmailClient from "./ResendEmailClient";

interface PageProps {
  searchParams: { email?: string };
}

export default function ResendEmailPage({ searchParams }: PageProps) {
  const email = searchParams.email ?? "";

  return <ResendEmailClient email={email} />;
=======
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { auth } from "@/app/lib/auth";

export default function ResendingEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const email = searchParams.get("email");
  const sent = searchParams.get("sent");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email || sent === "true") return; // dacă nu e email sau deja trimis

    const resendEmail = async () => {
      try {
        // Forma corectă conform TS: trimitem în body
        await auth.api.sendVerificationEmail({
          body: { email, callbackURL: "/" },
        });

        setMessage("✅ Verification email sent successfully!");

        // Actualizăm URL fără reload
        const params = new URLSearchParams(searchParams.toString());
        params.set("sent", "true");
        router.replace(`${pathname}?${params.toString()}`);
      } catch (err: any) {
        setMessage("❌ Error sending verification email: " + err.message);
      }
    };

    resendEmail();
  }, [email, sent, searchParams, pathname, router]);

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
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
}
