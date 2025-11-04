import Image from "next/image";
import Link from "next/link";
import logoPH from "@/public/logPHL.png";
import ViewRisk from "./foehn/ViewRisk";

export default function RightBar() {
  return (
    <div className="h-full  bg-gray-100 shadow-md flex flex-col items-center py-4 gap-6">
      <ViewRisk />
      {/* Secțiunea de sus */}
      <div className="flex flex-col items-center text-center">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Powered by
        </span>
        <Link href="https://www.paragliding-high.eu/" target="_blank" className="mt-1 hover:scale-110 transition-transform">
          <Image src={logoPH} alt="Paragliding High" width={50} height={50} />
        </Link>
      </div>

      {/* Aici poți adăuga elemente noi */}
      <div className="flex flex-col items-center gap-2">
        {/* Exemplu: un buton sau icon suplimentar */}
        {/* <button className="bg-blue-500 text-white px-2 py-1 rounded">Click me</button> */}
      </div>
    </div>
  );
}
