"use client";

import { useState } from "react";

type Props = {
  sendResetEmail: (email: string) => Promise<{ status: boolean }>;
};

export default function ForgotPasswordForm({ sendResetEmail }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await sendResetEmail(email);
      if (result.status) {
        setMessage("If the email exists, a reset link has been sent.");
      } else {
        setMessage("Failed to send reset link. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-sm "
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-600 text-white py-2 rounded-sm hover:bg-cyan-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.toLowerCase().includes("sent")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
