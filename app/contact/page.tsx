"use client";

import React, { useState } from "react";
import { contactForm } from "./action";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await contactForm(formData); // 👈 apel direct la server action
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again." + err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-16 px-4">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Get in Touch
      </h1>

      <p className=" text-center max-w-xl mb-12">
        Feel free to reach out at{" "}
        <a
          href="mailto:contact@paragliding-high.eu"
          className="text-sky-600 hover:underline"
        >
          contact@paragliding-high.eu
        </a>{" "}
        or send us a message using the form below.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg   p-8 space-y-6">
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded">
            Your message has been sent successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}

        {/* Name */}
        <div>
          <label className="block font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-gray-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-gray-500 outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-gray-500 outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-cyan-600 text-white font-semibold rounded py-3 hover:bg-cyan-700 transition disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
