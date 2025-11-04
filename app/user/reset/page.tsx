<<<<<<< HEAD
import ResetPasswordClient from "./ResetPasswordClient";

interface PageProps {
  searchParams: { token?: string };
}

export default function ResetPasswordPage({ searchParams }: PageProps) {
  const token = searchParams.token;

  if (!token) {
    return <p className="text-center mt-10 text-red-600">No reset token provided!</p>;
  }

  return <ResetPasswordClient token={token} />;
=======
"use client";

import { useSearchParams } from "next/navigation";
import { change_password } from "./reset-password";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const action = async (formData: FormData) => {
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    formData.set("token", token!);

    const res = await change_password(formData);
    if (res.message === "success") {
      window.location.href = "/user/login"; // ✅ works client-side
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

        <form action={action} className="space-y-4">
          <input type="hidden" name="token" defaultValue={token || ""} />

          <input
            name="password"
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
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Change Password
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
}
