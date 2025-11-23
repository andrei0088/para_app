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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200  px-4 py-6">
      <div className="w-full max-w-md bg-white  shadow-xl rounded-2xl p-8 border border-gray-200 ">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 ">
          Create Your ParaUP Account 🪂
        </h1>

        {message?.text && (
          <div className="mb-4 text-center text-sm text-red-600 bg-red-100  border border-red-300  rounded-lg p-2 font-medium">
            {message.text}
          </div>
        )}

        <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className={`w-full bg-white  text-gray-900  px-4 py-2.5 rounded-lg border transition
            ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            } focus:ring-2 outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className={`w-full bg-white  text-gray-900  px-4 py-2.5 rounded-lg border transition
            ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300  focus:ring-green-500"
            } focus:ring-2 outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={`w-full bg-white  text-gray-900  px-4 py-2.5 rounded-lg border transition
            ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300  focus:ring-green-500"
            } focus:ring-2 outline-none`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="ckpassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={`w-full bg-white  text-gray-900  px-4 py-2.5 rounded-lg border transition
            ${
              errors.ckpassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300  focus:ring-green-500"
            } focus:ring-2 outline-none`}
            />
            {errors.ckpassword && (
              <p className="text-red-500 text-sm mt-1">{errors.ckpassword}</p>
            )}
          </div>

          {/* Birth Date */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 ">
              Birth Date
            </label>
            <input
              type="date"
              name="bdate"
              onChange={handleChange}
              className={`w-full bg-white  text-gray-900  px-4 py-2.5 rounded-lg border transition
            ${
              errors.bdate
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300  focus:ring-green-500"
            } focus:ring-2 outline-none`}
            />
            {errors.bdate && (
              <p className="text-red-500 text-sm mt-1">{errors.bdate}</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm text-gray-700 ">
            <input
              type="checkbox"
              name="agree"
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300"
            />
            I agree to the{" "}
            <Link
              href="/user/tnc"
              className="text-green-600 hover:text-green-700 underline"
            >
              Terms & Conditions
            </Link>
          </label>
          {errors.agree && (
            <p className="text-red-500 text-sm mt-1">{errors.agree}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium transition-all hover:bg-green-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600 ">
          Already have an account?{" "}
          <Link
            href="/user/login"
            className="text-green-600 hover:text-green-700 underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
