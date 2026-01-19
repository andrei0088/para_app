// app/user/UserServer.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserClient from "./UserClient";
import { redirect } from "next/navigation";

export default async function UserServer() {
  // Obținem headers și le transformăm într-un obiect simplu
  const nextHeaders = await headers();
  const headersObj: Record<string, string> = {};
  nextHeaders.forEach((value: string, key: string) => {
    headersObj[key] = value;
  });

  const session = await auth.api.getSession({
    headers: headersObj,
  });

  const user = session?.user;
  if (!user) redirect("/");

  // Convertim null image în undefined
  const initialUser = {
    ...user,
    image: user.image ?? undefined,
  };

  return <UserClient initialUser={initialUser} />;
}
