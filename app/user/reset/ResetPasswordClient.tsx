"use client";

import { useState } from "react";
import { change_password } from "./reset-password";

interface ResetPasswordClientProps {
  token: string;
}

export default function ResetPasswordClient({
  token,
}: ResetPasswordClientProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("password", password);
    formData.set("token", token);

    const res = await change_password(formData);
    if (res.message === "success") {
      window.location.href = "/user/login"; // ✅ client redirect
      setLoading(false);
    } else {
      setLoading(false);
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {loading ? "Changeing Password" : "Change Password"}
            Change Password
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
