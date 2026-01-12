import Link from "next/link";
export default function JoinView() {
  return (
    <Link href="/user/register">
      <div
        className="flex items-center justify-center gap-2 py-3 my-3 px-6  rounded-sm cursor-pointer
             hover:bg-cyan-50 hover:text-cyan-700
 hover:shadow-lg"
      >
        Wing up and join!
      </div>
    </Link>
  );
}
