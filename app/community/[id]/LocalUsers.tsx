"use client";

import Link from "next/link";
import { useState } from "react";

type User = {
  name: string;
  url: string;
  public: boolean;
  userId: string;
};

type Props = {
  users: User[];
  joined: boolean;
  communityId: number;
  userId?: string | null;
  members: string[];
};

export default function LocalUsers({
  users,
  userId,
  communityId,
  members,
}: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // checks if user is already a local
  const isLocal = userId ? users.some((u) => u.userId === userId) : false;

  async function handleLocalClick() {
    setLoading(true);

    const res = await fetch("/api/wing-up/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        communityId,
        action: isLocal ? "leave" : "join", // <--- important
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error || "Failed to update locals");
      return;
    }

    if (res.ok) {
      window.location.reload();
    }
  }
  const isMember = userId ? members.includes(userId) : false;

  return (
    <section className="p-6 rounded-sm shadow-sm bg-white">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Local Pilots</h2>

        {userId && isMember && (
          <button
            onClick={handleLocalClick}
            className="text-sm px-3 py-1 bg-sky-700 text-white rounded-sm hover:bg-sky-900"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : !isLocal
                ? "I'm a Local Pilot"
                : "Remove me from locals"}
          </button>
        )}
      </div>

      {message && (
        <div className="text-sm text-green-800 bg-green-100 p-2 rounded mb-2">
          {message}
        </div>
      )}

      <ul className="mt-2 list-disc list-inside max-h-64 overflow-auto">
        {users.map((u, index) => (
          <li key={index} className="text-cyan-900">
            {u.public ? (
              <Link href={`/profile/${u.url}`}>{u.name}</Link>
            ) : (
              u.name
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
