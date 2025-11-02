"use client"
import Image from "next/image";
import top_img from "@/public/icons/top.png";
import { giveTop, remove_top } from "@/app/api/get/get_top";

interface TopClientProps {
  component: "c" | "r" | "t" | "l";
  id: number;
  top: number;
  activ : boolean;
}

export default function TopClient({ component, id, top , activ}: TopClientProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 py-4 px-5 bg-gray-100 rounded-2xl shadow-sm">
        <p className="text-gray-700 text-base font-medium">
          {top} people said it was <span className="font-semibold text-green-600">TOP</span>
        </p>
        <Image src={top_img} alt="top" className="w-8 h-8 object-cover" />
      </div>
{activ ? (<div
        onClick={() => {remove_top({component, id})}}
        className="flex items-center justify-center gap-2 py-3 px-6 border-2 hover:border-gray-900 rounded-full cursor-pointer
                   bg-green-100 border-green-500 hover:text-green-700 hover:bg-white
                   transition-all duration-300 active:scale-95
                   animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none shadow-sm hover:shadow-lg"
      >
        <span className="text-base font-semibold">It’s TOP</span>
        <Image src={top_img} alt="top" className="w-8 h-8 object-cover animate-[bounce_3s_infinite]" />
      </div>) : ( <div
        onClick={() => {giveTop({component, id})}}
        className="flex items-center justify-center gap-2 py-3 px-6 border-2 border-gray-900 rounded-full cursor-pointer
                   hover:bg-green-100 hover:border-green-500 hover:text-green-700
                   transition-all duration-300 active:scale-95
                   animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none shadow-sm hover:shadow-lg"
      >
        <span className="text-base font-semibold">It’s TOP</span>
        <Image src={top_img} alt="top" className="w-8 h-8 object-cover animate-[bounce_3s_infinite]" />
      </div>) }
      
    </div>
  );
}
