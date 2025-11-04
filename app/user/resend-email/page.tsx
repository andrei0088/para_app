import ResendEmailClient from "./ResendEmailClient";

interface PageProps {
  searchParams: { email?: string };
}

export default function ResendEmailPage({ searchParams }: PageProps) {
  const email = searchParams.email ?? "";

  return <ResendEmailClient email={email} />;
}
