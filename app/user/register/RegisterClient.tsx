"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signUpAction } from "@/app/api/actions/auth";
import Link from "next/link";

interface FormErrors {
  name: string;
  email: string;
  password: string;
  ckpassword: string;
  bdate: string;
  agree: string;
}

interface SignUpResult {
  text?: string;
  success?: boolean;
  email?: string;
}

// initialState trebuie să corespundă tipului SignUpResult
const initialState: SignUpResult = { text: "", success: false, email: "" };

export default function RegisterClient() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  // Tipizare corectă: primul param = tip returnat, al doilea = tip input
  const [message, formAction] = useActionState<SignUpResult, FormData>(
    signUpAction,
    initialState
  );

  const [errors, setErrors] = useState<FormErrors>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const ckpassword = formData.get("ckpassword")?.toString() || "";
    const bdate = formData.get("bdate")?.toString() || "";
    const agree = formData.get("agree") === "on";

    const newErrors: FormErrors = {
      name: "",
      email: "",
      password: "",
      ckpassword: "",
      bdate: "",
      agree: "",
    };

    let hasError = false;

    if (!name) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Invalid email";
      hasError = true;
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (password !== ckpassword) {
      newErrors.ckpassword = "Passwords do not match";
      hasError = true;
    }

    if (!bdate) {
      newErrors.bdate = "Birth date is required";
      hasError = true;
    }

    if (!agree) {
      newErrors.agree = "You must agree to the terms";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      e.preventDefault();
      return;
    }

    setPending(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        {message?.text && (
          <div className="mb-4 text-center text-sm text-red-600 bg-red-100 border border-red-300 rounded p-2">
            {message.text}
          </div>
        )}

        <form action={formAction} method="POST" className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="ckpassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.ckpassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.ckpassword && <p className="text-red-600 text-sm mt-1">{errors.ckpassword}</p>}
          </div>

          {/* Birth Date */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Birth Date</label>
            <input
              type="date"
              name="bdate"
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.bdate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.bdate && <p className="text-red-600 text-sm mt-1">{errors.bdate}</p>}
          </div>

          {/* Agree Terms */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="agree" onChange={handleChange} className="w-4 h-4" />
            I agree to the{" "}
            <Link href="/user/tnc" className="text-green-600 underline hover:text-green-700">
              Terms & Conditions
            </Link>
          </label>
          {errors.agree && <p className="text-red-600 text-sm mt-1">{errors.agree}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/user/login" className="text-green-600 underline hover:text-green-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
