"use client";

import { useState } from "react";
import send_email from "./sendMail";

export default function Join() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget; // 🔥 salvăm formularul ca să nu se piardă în async
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await send_email(data.name, data.email, data.message);

      if (res.success) {
        setMessage(
          "✅ Thank you! Your ideas have been received. We’ll make them count!"
        );
        form.reset(); // 🔥 reset corect
      } else {
        setMessage(
          "❌ Oops! Something went wrong: " + (res.error ?? "Unknown error")
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("❌ Error: " + err.message);
      } else {
        setMessage("❌ Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-blue-50 px-4 py-16">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl border border-gray-200 p-8 md:p-10 space-y-8 animate-fadeIn">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
            Join Our Paragliding Community
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            🌍 Share your ideas, help shape a friendly community, and connect
            with paragliding enthusiasts from all around the world.
          </p>
        </div>

        <form onSubmit={sendMail} className="space-y-6">
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Your Email Address"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Share your ideas with us..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {message && (
          <div
            className={`text-center text-base font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-center text-gray-500 text-sm pt-4">
          💙 Thank you for helping us build this community — together we fly
          higher.
        </p>
      </div>
    </div>
  );
}
