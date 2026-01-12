import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
export default async function JoinView({
  type,
  id,
}: {
  type: string;
  id: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  var url;
  if (session?.user) url = `/update?type=${type}&id=${id}`;
  else url = "/user/register";
  return (
    <Link href={url}>
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
