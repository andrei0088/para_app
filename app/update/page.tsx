"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Update() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  function handleSubmit() {
    alert(
      `Update submitted:\nType: ${type}\nID: ${id}\nMessage: ${message} \n Under work for now!!`
    );
  }
  return (
    <div>
      <h2>What do you want to update?</h2>
      <textarea
        name="update"
        id="update"
        className="border w-full h-64 p-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="border bg-sky-900 text-white p-2 rounded-sm cursor-pointer"
        onClick={handleSubmit}
      >
        Submit Update
      </button>
    </div>
  );
}
