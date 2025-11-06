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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("email", formState.email);
    formData.append("password", formState.password);

    startTransition(async () => {
      const result = await signInAction(formData);

      if (result.success) {
        window.location.href = "/";
      } else {
        setErrorMessage(result.text || "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-sm transition-all">

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
          Welcome Back 👋
        </h2>

        {errorMessage && (
          <div className="text-red-600 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-2 text-sm text-center font-medium mb-4">
            ❌ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
            px-4 py-2.5 rounded-lg text-gray-900 dark:text-gray-100
            focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800
            px-4 py-2.5 rounded-lg text-gray-900 dark:text-gray-100
            focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          />

          <Link href="/user/forgot-password" className="block text-right text-sm text-green-600 hover:underline">
            I forgot my password
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2.5 rounded-lg text-white font-medium transition-all duration-200 
            ${isPending ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"}`}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {isPending && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4 animate-pulse">
            Please wait, checking your credentials...
          </p>
        )}
      </div>
    </div>
  );
}
