"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  joined: boolean;
  type: string;
  url: string;
  id: number;
};

export default function ActionButton(props: Props) {
  const id = props.url.replace(/\D/g, "");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleJoinLeave(action: "join" | "leave") {
    setError(null);

    const res = await fetch("/api/wing-up/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        communityId: props.id,
        action,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unknown error");
      return;
    }

    if (data.success) {
      router.refresh();
    }
  }

  return (
    <section className="mt-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          className="p-1 w-1/2 bg-sky-700 text-white text-center rounded-sm text-lg hover:bg-sky-900"
          onClick={() => handleJoinLeave(props.joined ? "leave" : "join")}
        >
          {props.joined ? "Leave Community" : "Join Community"}
        </button>

        {!(props.url[0] === "c" && props.url[1] === "c") && (
          <Link
            href={props.type === "Country" ? `/country/${id}` : `/region/${id}`}
            className="w-1/2"
          >
            <div className="p-1 w-full bg-sky-700 text-white text-center rounded-sm text-lg hover:bg-sky-900">
              View page
            </div>
          </Link>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
    </section>
  );
}
