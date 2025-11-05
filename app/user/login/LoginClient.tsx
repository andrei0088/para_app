"use client";

import { useState, useTransition } from "react";
import { signInAction } from "@/app/api/actions/auth";
import Link from "next/link";

export default function LoginClient() {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("email", formState.email);
    formData.append("password", formState.password);

    startTransition(async () => {
      try {
        const result = await signInAction(formData);
        if (result.success) {
          window.location.href = "/"; // redirect imediat pe client
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else if (typeof err === "string") {
          setErrorMessage(err);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Log In</h2>

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
