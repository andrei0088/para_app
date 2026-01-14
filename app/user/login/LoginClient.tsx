"use client";

import { useState, useTransition } from "react";
import { signInAction } from "@/app/api/actions/auth";
import Link from "next/link";

type Succes = {
  succes?: boolean;
};

export default function LoginClient({ succes = false }: Succes) {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null);

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
        return;
      }

      if (result.text === "validation") {
        setErrorMessage(
          <span>
            Your account is not verified yet. Please check your email inbox —
            including spam/junk. <br />
            Didn’t receive the email?{" "}
            <Link
              href={`/user/resend-email?email=${formState.email}`}
              className="text-green-600 underline hover:text-green-700"
            >
              Resend verification email
            </Link>
            .
          </span>
        );
        return;
      }

      setErrorMessage(result.text || "Something went wrong. Please try again.");
    });
  }

  return (
    <div className=" flex items-center justify-center p-6">
      <div className=" p-8 rounded-sm shadow-sm w-full max-w-sm transition-all">
        <h2 className="text-2xl font-semibold text-center mb-6  ">
          Don’t have an account yet?{" "}
          <Link
            href={"/user/register"}
            className="text-cyan-800 hover:text-cyan-900 underline"
          >
            Sign up here
          </Link>{" "}
          to join the community!
        </h2>

        {succes && (
          <div className="bg-green-100  border-green-300  text-green-700  rounded-sm p-3 text-sm text-center font-medium mb-4 animate-fade-in">
            ✅ Your account has been successfully verified! You can now log in
            ✨
          </div>
        )}

        {errorMessage && (
          <div className="text-red-600 bg-red-100  border-red-300  rounded-sm p-2 text-sm text-center font-medium mb-4">
            ❌ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            autoComplete="username"
            required
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full border border-gray-300  bg-white  px-4 py-2.5 rounded-sm text-gray-900  "
          />

          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            className="w-full border border-gray-300  bg-white  px-4 py-2.5 rounded-sm text-gray-900  "
          />

          <Link
            href="/user/forgot-password"
            className="block text-right text-sm text-slate-600 hover:underline"
          >
            I forgot my password
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2.5 rounded-sm text-white font-medium transition-all duration-200 
            ${
              isPending
                ? "bg-cyan-400 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700 active:scale-[0.98]"
            }`}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
