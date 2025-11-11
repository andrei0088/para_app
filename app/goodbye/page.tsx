"use client";

import Link from "next/link";

export default function GoodbyePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white px-4 sm:px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
          Your Account Has Been Deactivated 🪶
        </h1>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          We&apos;re sorry to see you leave Para APP. Your account is now safely
          deactivated — no worries, your data is still stored securely.
        </p>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
          The sky will always be open for you. If you&apos;d like to share why
          you left or what we could do better, we&apos;d truly appreciate your
          feedback.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="w-full sm:w-auto flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
          >
            Share Feedback 💬
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto flex-1 bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 transition-colors text-center"
          >
            I Changed My Mind — Take Me Back 🪂
          </Link>
        </div>

        <p className="text-gray-400 mt-8 text-sm sm:text-base">
          You&apos;re welcome back anytime — just sign in again and we&apos;ll
          restore everything.
        </p>
      </div>
    </main>
  );
}
