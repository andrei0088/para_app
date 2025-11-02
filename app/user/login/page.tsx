"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { signInAction } from "@/app/api/actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null); // reset error on submit

    const formData = new FormData();
    formData.append("email", formState.email);
    formData.append("password", formState.password);

    startTransition(async () => {
      try {
        await signInAction(formData);
      } catch (err: any) {
        setErrorMessage(err.message || "An unexpected error occurred.");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Log In</h2>

        {verified && (
          <p className="text-green-600 text-sm text-center mb-3">
            ✅ Email verified! You can now log in.
          </p>
        )}

        {errorMessage && (
          <p className="text-red-600 text-sm text-center mb-3">
            ❌ {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <p>
            I <Link href="/user/forgot-password" className="text-green-600">Forgot my password</Link>
          </p>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full text-white py-2 rounded transition ${
              isPending ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {isPending && (
          <p className="text-center text-gray-500 text-sm mt-3 animate-pulse">
            Please wait, checking your credentials...
          </p>
        )}
      </div>
    </div>
  );
}
