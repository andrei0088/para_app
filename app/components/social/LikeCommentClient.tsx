"use client";
import Image from "next/image";
import top_img from "@/public/icons/top.png";
import Link from "next/link";
import { add_comment_like, remove_comment_like } from "./action";

type CommentCharType = "c" | "r" | "t" | "l";

interface TopClientProps {
  commentId: string;
  like: number;
  type: CommentCharType;
  userLiked: boolean;
  logd: boolean;
}

export default function LikeCommentClient({
  commentId,
  like,
  type,
  userLiked,
  logd,
}: TopClientProps) {
  return (
    <div className="w-fit flex">
      {logd ? (
        <>
          {userLiked ? (
            <div
              onClick={() => {
                remove_comment_like({ commentId, type });
                window.location.reload();
              }}
              className="flex items-center gap-1 py-1 px-2 border-2 rounded-full cursor-pointer
                     bg-cyan-100 border-cyan-500 hover:bg-white hover:text-cyan-700 hover:border-cyan-600
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none text-xs md:text-sm"
            >
              <span className="font-semibold text-cyan-600">I gave a</span>
              <Image
                src={top_img}
                alt="top"
                className="w-4 h-4 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
              />
            </div>
          ) : (
            <div
              onClick={() => {
                add_comment_like({ commentId, type });
                window.location.reload();
              }}
              className="flex items-center gap-1 py-1 px-2 border-2 border-gray-900 rounded-full cursor-pointer
                     hover:bg-cyan-100 hover:border-cyan-500 hover:text-cyan-700
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none text-xs md:text-sm"
            >
              <span className="font-semibold">I give a</span>
              <Image
                src={top_img}
                alt="top"
                className="w-4 h-4 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
              />
            </div>
          )}
        </>
      ) : (
        <Link
          href={`/user/login`}
          className="flex items-center gap-1 py-1 px-2 border-2 border-gray-900 rounded-full cursor-pointer
                     hover:bg-cyan-100 hover:border-cyan-500 hover:text-cyan-700
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
