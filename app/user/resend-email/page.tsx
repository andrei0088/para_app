import resendValidationEmail from "./action";
import ResendEmailClient from "./ResendEmailClient";
import { redirect } from "next/navigation";

export default async function ResendEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const param = await searchParams;
  const email = param.email ?? null;

  if (!email) {
    return redirect("/");
  }

  const rez = await resendValidationEmail(email);

  return <ResendEmailClient rez={rez} email={email} />;
}
