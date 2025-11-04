"use client";

import { useActionState } from "react";
import { signUpAction } from "@/app/api/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { SignUpResult } from "@/app/types";

interface RegisterClientProps {
  prefillEmail?: string;
}

export default function RegisterClient({ prefillEmail }: RegisterClientProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const initialState: SignUpResult = { text: "", user: {} };
  const [message, formAction] = useActionState<SignUpResult, FormData>(signUpAction, initialState);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    ckpassword: "",
    bdate: "",
    agree: "",
  });

  useEffect(() => {
    if (message) {
      setPending(false);
      if (message.success && message.email) {
        router.push(`/user/verifyemail?email=${message.email}`);
      }
    }
  }, [message, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create Account</h1>

        {message?.text && (
          <div className="mb-4 text-center text-sm text-red-600 bg-red-100 border border-red-300 rounded p-2">
            {message.text}
          </div>
        )}

        <form action={formAction} method="POST" className="space-y-4">
          <input type="email" name="email" defaultValue={prefillEmail} hidden />
          {/* restul formului exact ca în codul tău */}
        </form>
      </div>
    </div>
  );
}
