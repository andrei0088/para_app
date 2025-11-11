"use client";
import { useState } from "react";
import MessageForm from "./MessageForm";

interface PMUserProps {
  userId: string;
  userName: string; // numele userului căruia trimitem mesaj
}

const PMUser = ({ userName, userId }: PMUserProps) => {
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <>
      <button
        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
        onClick={() => setOpenMessage(true)}
      >
        Send a message
      </button>

      {/* Lightbox/modal */}
      {openMessage && (
        <MessageForm
          recipientName={userName}
          recipientId={userId}
          onClose={() => setOpenMessage(false)}
        />
      )}
    </>
  );
};

export default PMUser;
