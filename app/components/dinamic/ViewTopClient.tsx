"use client";
import Image from "next/image";
import top_img from "@/public/icons/top.png";
import { giveTop, remove_top } from "@/app/api/get/get_top";

interface TopClientProps {
  component: "c" | "r" | "t" | "l";
  id: number;
  top: number;
  activ: boolean;
}

export default function TopClient({
  component,
  id,
  top,
  activ,
}: TopClientProps) {
  return (
    <div className="space-y-4 mb-5">
      {/* Info top count */}
      <div className="flex items-center gap-3 py-3 px-4 md:py-4 md:px-5 bg-sky-50  rounded-sm shadow-sm">
        <p className="  text-sm md:text-base font-medium">
          {top} people said it was{" "}
          <span className="font-semibold text-cyan-700">TOP</span>
        </p>
        <Image
          src={top_img}
          alt="top"
          className="w-6 h-6 md:w-8 md:h-8 object-cover"
        />
      </div>

      {/* TOP Button */}
      {activ ? (
        <div
          onClick={() => remove_top({ component, id })}
          className="flex items-center justify-center gap-2 py-2 md:py-3 px-4 md:px-6 border-2 rounded-sm cursor-pointer
                     bg-sky-100 border-cyan-500 hover:bg-white hover:text-cyan-700 hover:border-cyan-600
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md
                     animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none"
        >
          <span className="text-sm md:text-base font-semibold text-cyan-600">
            It isn&apos;t TOP
          </span>
          <Image
            src={top_img}
            alt="top"
            className="w-6 h-6 md:w-8 md:h-8 object-cover animate-[bounce_3s_infinite]"
          />
        </div>
      ) : (
        <div
          onClick={() => giveTop({ component, id })}
          className="flex items-center justify-center gap-2 py-2 md:py-3 px-4 md:px-6 border border-cyan-800 rounded-sm cursor-pointer
                     hover:bg-sky-100 hover:border-cyan-500 hover:text-cyan-700
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md
                     animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none"
        >
          <span className="text-sm md:text-base font-semibold">
            It&apos;s TOP
          </span>
          <Image
            src={top_img}
            alt="top"
            className="w-6 h-6 md:w-8 md:h-8 object-cover animate-[bounce_3s_infinite]"
          />
        </div>
      )}
    </div>
  );
}
