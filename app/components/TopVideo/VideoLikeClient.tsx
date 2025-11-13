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

  const handleAdd = async () => {
    if (loading) return;
    setUserLiked(true);
    setLike((prev) => prev + 1); // optimistic update
    setLoading(true);
    try {
      await add_video_like(videoId);
    } catch (err) {
      setUserLiked(false); // rollback
      setLike((prev) => prev - 1);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (loading) return;
    setUserLiked(false);
    setLike((prev) => prev - 1); // optimistic update
    setLoading(true);
    try {
      await remove_video_like(videoId);
    } catch (err) {
      setUserLiked(true); // rollback
      setLike((prev) => prev + 1);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 ml-auto w-full justify-end py-1 h-auto dark:text-gray-900">
      {logd ? (
        userLiked ? (
          <div
            onClick={handleRemove}
            className="flex items-center gap-1 py-1 px-2 border-2 rounded-full cursor-pointer
                     bg-green-100 border-green-500 hover:bg-white hover:text-green-700 hover:border-green-600
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none text-xs md:text-sm"
          >
            <span className="font-semibold text-green-600">I gave a</span>
            <Image
              src={top_img}
              alt="top"
              className="w-4 h-4 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
            />
          </div>
        ) : (
          <div
            onClick={handleAdd}
            className="flex items-center gap-1 py-1 px-2 border-2 border-gray-900 rounded-full cursor-pointer
                     hover:bg-green-100 hover:border-green-500 hover:text-green-700
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none text-xs md:text-sm"
          >
            <span className="font-semibold">I give a</span>
            <Image
              src={top_img}
              alt="top"
              className="w-4 h-4 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
            />
          </div>
        )
      ) : (
        <Link
          href={`/user/login`}
          className="flex items-center gap-1 py-1 px-2 border-2 border-gray-900 rounded-full cursor-pointer
                     hover:bg-green-100 hover:border-green-500 hover:text-green-700
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none text-xs md:text-sm"
        >
          Join to drop a{" "}
          <Image
            src={top_img}
            alt="top"
            className="w-3 h-3 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
          />
        </Link>
      )}

      <div className="flex items-center gap-1 py-1 px-2 bg-gray-100 rounded-2xl shadow-sm text-xs md:text-sm">
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
