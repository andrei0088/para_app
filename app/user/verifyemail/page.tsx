import VerifyEmailClient from "./VerifyEmailClient";

interface PageProps {
  searchParams: { email?: string };
}

export default function VerifyEmailPage({ searchParams }: PageProps) {
  const email = searchParams.email;

  // Dacă nu există email, redirecționăm pe server
  if (!email) {
    return <p className="text-red-600 text-center mt-10">Email not provided!</p>;
  }

  return <VerifyEmailClient email={email} />;
}
