"use client";

import { useEffect, useState } from "react";

type Rezult = {
  succes: boolean;
  message?: string;
};

export default function ResendEmailClient({
  rez,
  email,
}: {
  rez: Rezult;
  email: string;
}) {
  const [sending, setSending] = useState(true);
  const [msg, setMsg] = useState("");

  // Rulează o singură dată după render
  useEffect(() => {
    setSending(false);
    if (rez.succes) {
      setMsg(
        "✅ Verification email sent! Please check your inbox & spam folder."
      );
    } else {
      setMsg(rez.message || "❌ Something went wrong. Please try again.");
    }
  }, [rez]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200  p-6">
      <div className="max-w-md w-full bg-white  p-8 rounded-2xl shadow-xl border border-gray-200  text-center">
        {sending ? (
          <p className="text-gray-700 ">
            ⏳ Sending verification email to <strong>{email}</strong>...
          </p>
        ) : (
          <p
            className={`p-4 rounded-md text-sm ${
              msg.startsWith("✅")
                ? "bg-green-100 text-green-800 "
                : "bg-red-100 text-red-700 "
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
