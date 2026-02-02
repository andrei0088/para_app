"use client";

import { useState } from "react";

type Props = {
  postId: string;
};

export default function ReportButton({ postId }: Props) {
  const [loading, setLoading] = useState(false);
  const [reported, setReported] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loading || reported) return;

    setLoading(true);

    try {
      const res = await fetch("/api/community/report_post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      const data = await res.json();

      if (res.ok) {
        setReported(true);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleClick}
        disabled={loading || reported}
        className={`
          px-3 py-2 rounded-sm text-sm font-semibold
          flex items-center gap-2
          transition-all duration-300
          ${
            reported
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-rose-600 text-white hover:bg-rose-700 shadow-sm hover:shadow-md"
          }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {reported ? "Reported" : "Report"}
      </button>
    </div>
  );
}
