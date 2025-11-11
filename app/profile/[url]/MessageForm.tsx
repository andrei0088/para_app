"use client";

import { useState } from "react";
import sendEmail from "./sendEmail";

interface MessageFormProps {
  onClose: () => void;
  recipientName: string;
  recipientId: string;
}

export default function MessageForm({
  onClose,
  recipientName,
  recipientId,
}: MessageFormProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await sendEmail(recipientId, subject, message);

    // Setăm statusul primit de la server
    setStatus({ success: res.success, message: res.message });
    setLoading(false);
    // Resetăm form-ul
    setSubject("");
    setMessage("");
  };

  // Dacă avem status, afișăm doar mesajul și un buton OK pentru închidere
  if (status) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => {
          setStatus(null);
          onClose();
        }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4 text-center">
          <p
            className={`mb-4 ${
              status.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
          <button
            onClick={() => {
              setStatus(null);
              onClose();
            }}
            className="px-6 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // Formular normal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">
          Send a message to {recipientName}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="px-4 py-2 rounded-xl border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600"
            >
              {loading ? "Sending ..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
