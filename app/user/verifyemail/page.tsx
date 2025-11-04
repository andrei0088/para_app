<<<<<<< HEAD
import VerifyEmailClient from "./VerifyEmailClient";

interface PageProps {
  searchParams: { email?: string };
}

export default function VerifyEmailPage({ searchParams }: PageProps) {
  const email = searchParams.email;

  // Dacă nu există email, redirecționăm pe server
  if (!email) {
    return <p className="text-red-600 text-center mt-10">Email not provided!</p>;
  }

  return <VerifyEmailClient email={email} />;
=======
"use client";

import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); 

  if (!email) redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Almost there!</h1>
        <p className="mb-6 text-gray-700">
          We've sent a confirmation email to your inbox. Please check your email and click the verification link to activate your account.
        </p>
        <p className="mb-6 text-gray-700">
          Didn't receive the email? Check your spam folder or{" "}
          <Link
            href={`/user/resend-email?email=${email}&sent=false`}
            className="text-green-600 underline hover:text-green-700"
          >
            resend it
          </Link>.
        </p>
        <Link
          href="/user/login"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
}
