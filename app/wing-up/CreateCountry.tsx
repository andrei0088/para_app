import Link from "next/link";

export default function CreateCountry() {
  return (
    <div className="mt-4">
      <p className="mb-3">
        If your country or region is not listed, you can create it.
      </p>
      <Link href="/wing-up/create-community/c0">
        <span className="inline-block rounded-sm border border-gray-300 px-5 py-2  font-medium text-gray-800 transition hover:border-gray-400 hover:bg-gray-50">
          Create Country Community
        </span>
      </Link>{" "}
      <Link href="/wing-up/create-community/r0">
        <span className="inline-block rounded-sm border border-gray-300 px-5 py-2  font-medium text-gray-800 transition hover:border-gray-400 hover:bg-gray-50">
          Create Region Community
        </span>
      </Link>
    </div>
  );
}
