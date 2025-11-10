"use client";

import { useState } from "react";
import returnUser from "./actions"; // corect numele funcției

interface ReturnUserProps {
  name: string;
}

interface ReturnUserResult {
  success?: boolean;
  emailSent?: boolean;
  activated?: boolean;
}

export default function ReturnUser({ name }: ReturnUserProps) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMsg("Please enter your email address to continue.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const rez: ReturnUserResult = await returnUser(email.trim(), name);

      if (rez.success) {
        setMsg(
          "✅ Check your inbox! A verification email has been sent to reactivate your account."
        );
      } else if (rez.emailSent === false) {
        setMsg(
          "❌ We couldn't send the email. Please check your address or contact support."
        );
      } else if (rez.activated === false) {
        setMsg(
          "❌ There was a problem reactivating your account. Contact support for assistance."
        );
      } else {
        setMsg(
          "❌ Something went wrong. Please contact support at contact@paragliding-high.eu."
        );
      }
    } catch (error) {
      console.error(error);
      setMsg(
        "❌ Unexpected error occurred. Please try again later or contact support."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Welcome back, {name}!
      </h2>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        To reactivate your account, please enter your email below. If you need
        help, contact our support team.
      </p>

      {msg && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            msg.startsWith("✅")
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "Sending..." : "Send Verification Email"}
        </button>
      </form>
    </div>
  );
}
