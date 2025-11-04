import RegisterClient from "./RegisterClient";

interface PageProps {
  searchParams: { email?: string };
}

export default function RegisterPage({ searchParams }: PageProps) {
  return <RegisterClient prefillEmail={searchParams.email} />;
}
