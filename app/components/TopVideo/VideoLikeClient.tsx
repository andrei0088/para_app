"use client";
import Image from "next/image";
import top_img from "@/public/icons/top.png";
import {
  add_video_like,
  remove_video_like,
} from "@/app/profile/[url]/get_profil";
import Link from "next/link";
import { useState } from "react";

interface TopClientProps {
  videoId: number;
  like: number;
  userLiked: boolean;
  logd: boolean;
}

export default function VideoLikeClient({
  videoId,
  like: initialLike,
  userLiked: initialUserLiked,
  logd,
}: TopClientProps) {
  const [like, setLike] = useState(initialLike);
  const [userLiked, setUserLiked] = useState(initialUserLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    // Optimistic update
    const newLiked = !userLiked;
    setUserLiked(newLiked);
    setLike((prev) => prev + (newLiked ? 1 : -1));
    setLoading(true);

    try {
      if (newLiked) {
        await add_video_like(videoId);
      } else {
        await remove_video_like(videoId);
      }
    } catch (err) {
      // rollback dacă a eșuat
      setUserLiked(userLiked);
      setLike((prev) => prev + (userLiked ? 1 : -1));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 ml-auto w-full justify-end py-1 h-auto dark:text-gray-900">
      {logd ? (
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex items-center gap-1 py-1 px-2  rounded-sm cursor-pointer
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md text-xs md:text-sm
                     ${
                       userLiked
                         ? "bg-green-50 border-green-100 hover:bg-green-100 hover:text-green-900 hover:border-green-100"
                         : "border-gray-900 hover:bg-green-50 hover:border-green-800 hover:text-green-900"
                     }
                     ${loading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <span
            className={`font-semibold ${userLiked ? "text-green-600" : ""}`}
          >
            {userLiked ? "I gave a" : "I give a"}
          </span>
          <Image
            src={top_img}
            alt="top"
            className="w-4 h-4 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
          />
        </button>
      ) : (
        <Link
          href={`/user/login`}
          className="flex items-center gap-1 py-1 px-2 border-2 border-gray-900 rounded-sm cursor-pointer
                     hover:bg-green-100 hover:border-green-700 hover:text-green-900
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none text-xs md:text-sm"
        >
          Join to drop a
          <Image
            src={top_img}
            alt="top"
            className="w-3 h-3 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
          />
        </Link>
      )}

      <div className="flex items-center gap-1 py-1 px-2 bg-gray-100 rounded-sm shadow-sm text-xs md:text-sm">
        <p className="text-gray-700 font-medium">receive {like}</p>
        <Image
          src={top_img}
          alt="top"
          className="w-4 h-4 md:w-5 md:h-5 object-cover"
        />
      </div>
    </div>
  );
}
