import Image from "next/image";
import Link from "next/link";
import logoPH from "@/public/logPHL.png";
import ViewRisk from "./foehn/ViewRisk";

export default function RightBar() {
  return (
    <aside className="w-full h-full lg:w-64 bg-white  shadow-md flex flex-col items-center py-3 gap-4 border-l border-gray-200 ">
      {/* ViewRisk component */}
      <div className="w-full px-3">
        <ViewRisk />
      </div>

      {/* Powered by */}
      <div className="flex flex-col items-center text-center px-2">
        <span className="text-xs font-semibold text-gray-400  uppercase tracking-wider">
          Powered by
        </span>
        <Link
          href="https://www.paragliding-high.eu/"
          target="_blank"
          className="mt-1 hover:scale-110 transition-transform"
        >
          <Image
            src={logoPH}
            alt="Paragliding High"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
      </div>

      {/* Extra section */}
      <div className="flex flex-col items-center gap-2 w-full px-3"></div>
    </aside>
  );
}
