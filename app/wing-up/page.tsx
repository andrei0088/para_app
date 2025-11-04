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
        setMessage("✅ Thank you! Your ideas have been received. We’ll make them count!");
        form.reset(); // 🔥 reset corect
      } else {
        setMessage("❌ Oops! Something went wrong: " + (res.error ?? "Unknown error"));
      }
<<<<<<< HEAD
    } catch (err: unknown) {
  if (err instanceof Error) {
    setMessage("❌ Error: " + err.message);
  } else {
    setMessage("❌ Unexpected error");
  }
} finally {
=======
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    } finally {
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        Join Our Paragliding Community!
      </h1>

      <p className="text-gray-700 text-lg">
        🚀 We’re building an amazing online hub for paragliding enthusiasts like you.
        Share your ideas, tips, or favorite spots and help shape a community where 
        everyone can connect, learn, and inspire each other. Your voice matters! 🌟
      </p>

      <form onSubmit={sendMail} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message / Ideas"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {loading ? "Sending..." : "Send Your Ideas"}
        </button>
      </form>

      {message && (
        <p className={`text-center font-medium mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <p className="text-center text-gray-500 text-sm mt-4">
        💡 Share this page with friends — together, we’ll soar higher!
      </p>
    </div>
  );
}
