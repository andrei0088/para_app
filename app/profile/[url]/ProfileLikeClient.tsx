"use client";
import Image from "next/image";
import top_img from "@/public/icons/top.png";
import { add_profile_like, remove_profile_like } from "./get_profil";
import Link from "next/link";
import { useState } from "react";

interface TopClientProps {
  profileId: number;
  like: number;
  userLiked: boolean;
  logd: boolean;
}

export default function ProfileLikeClient({
  profileId,
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
      await add_profile_like(profileId);
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
      await remove_profile_like(profileId);
    } catch (err) {
      setUserLiked(true); // rollback
      setLike((prev) => prev + 1);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mb-5 dark:text-gray-800">
      {/* Info top count */}
      <div className="flex items-center gap-3 py-3 px-4 md:py-4 md:px-5 bg-gray-100  rounded-2xl shadow-sm">
        <p className="text-gray-700  text-sm md:text-base font-medium">
          receive {like}
        </p>
        <Image
          src={top_img}
          alt="top"
          className="w-6 h-6 md:w-8 md:h-8 object-cover"
        />
      </div>

      {logd ? (
        <>
          {userLiked ? (
            <div
              onClick={handleRemove}
              className="flex items-center justify-center gap-2 py-2 md:py-3 px-4 md:px-6 border-2 rounded-full cursor-pointer
                     bg-green-100 border-green-500 hover:bg-white hover:text-green-700 hover:border-green-600
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md
                     animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none"
            >
              <span className="text-sm md:text-base font-semibold text-green-600">
                I gave a{" "}
              </span>
              <Image
                src={top_img}
                alt="top"
                className="w-6 h-6 md:w-8 md:h-8 object-cover animate-[bounce_3s_infinite]"
              />
            </div>
          ) : (
            <div
              onClick={handleAdd}
              className="flex items-center justify-center gap-2 py-2 md:py-3 px-4 md:px-6 border-2 border-gray-900 rounded-full cursor-pointer
                     hover:bg-green-100 hover:border-green-500 hover:text-green-700
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md
                     animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none"
            >
              <span className="text-sm md:text-base font-semibold">
                I give a
              </span>
              <Image
                src={top_img}
                alt="top"
                className="w-6 h-6 md:w-8 md:h-8 object-cover animate-[bounce_3s_infinite]"
              />
            </div>
          )}
        </>
      ) : (
        <Link
          href={`/user/login`}
          className="flex items-center justify-center gap-2 py-2 md:py-3 px-4 md:px-6 border-2 border-gray-900 rounded-full cursor-pointer
                     hover:bg-green-100 hover:border-green-500 hover:text-green-700
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md
                     animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none"
        >
          Join to drop a{" "}
          <Image
            src={top_img}
            alt="top"
            className="w-3 h-3 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
          />
        </Link>
      )}
    </div>
  );
}
