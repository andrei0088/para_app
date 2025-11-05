"use client"
import Image from "next/image";
import top_img from "@/public/icons/top.png";
import { giveTop, remove_top } from "@/app/api/get/get_top";

interface TopClientProps {
  component: "c" | "r" | "t" | "l";
  id: number;
  top: number;
  activ: boolean;
}

export default function TopClient({ component, id, top, activ }: TopClientProps) {
  return (
    <div className="space-y-4">
      {/* Info top count */}
      <div className="flex items-center gap-3 py-3 px-4 md:py-4 md:px-5 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-sm">
        <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base font-medium">
          {top} people said it was <span className="font-semibold text-green-600">TOP</span>
        </p>
        <Image src={top_img} alt="top" className="w-6 h-6 md:w-8 md:h-8 object-cover" />
      </div>

      {/* TOP Button */}
      {activ ? (
        <div
          onClick={() => remove_top({ component, id })}
          className="flex items-center justify-center gap-2 py-2 md:py-3 px-4 md:px-6 border-2 rounded-full cursor-pointer
                     bg-green-100 border-green-500 hover:bg-white hover:text-green-700 hover:border-green-600
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md
                     animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none"
        >
          <span className="text-sm md:text-base font-semibold text-green-600">It isn&apos;t TOP</span>
          <Image src={top_img} alt="top" className="w-6 h-6 md:w-8 md:h-8 object-cover animate-[bounce_3s_infinite]" />
        </div>
      ) : (
        <div
          onClick={() => giveTop({ component, id })}
          className="flex items-center justify-center gap-2 py-2 md:py-3 px-4 md:px-6 border-2 border-gray-900 rounded-full cursor-pointer
                     hover:bg-green-100 hover:border-green-500 hover:text-green-700
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md
                     animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none"
        >
          <span className="text-sm md:text-base font-semibold">It&apos;s TOP</span>
          <Image src={top_img} alt="top" className="w-6 h-6 md:w-8 md:h-8 object-cover animate-[bounce_3s_infinite]" />
        </div>
      )}
    </div>
  );
}
