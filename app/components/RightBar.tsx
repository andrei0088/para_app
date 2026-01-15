import Image from "next/image";
import Link from "next/link";
import logoPH from "@/public/logPHL.png";
import ViewRisk from "./foehn/ViewRisk";

export default function RightBar() {
  return (
    <aside className="w-full h-full lg:w-64 bg-white  flex flex-col items-center py-3 gap-4 border-r border-l border-r-1 border-gray-100 ">
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
      <div className="flex flex-col items-center text-center px-2 w-full space-y-2">
        <h2>You may like to use:</h2>
        <Link href="https://flyxc.app/" className="text-cyan-800 font-semibold">
          FlyXC
        </Link>
        <Link
          href="https://www.hikeandfly.org/"
          className="text-cyan-800 font-semibold"
        >
          Hike&Fly
        </Link>
        <Link
          href="https://paraglidable.com/"
          className="text-cyan-800 font-semibold"
        >
          Paraglidable
        </Link>
      </div>

      {/* Extra section */}
      <div className="flex flex-col items-center gap-2 w-full px-3 ">
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=Z98ZZ6XFM5PRA"
          className="inline-block bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-cyan-700 transition shadow-md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate via PayPal
        </a>
      </div>
    </aside>
  );
}
