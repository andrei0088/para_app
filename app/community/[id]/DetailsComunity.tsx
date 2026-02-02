import Link from "next/link";

type Props = {
  name: string;
  createdBy: string;
  validated: boolean;
  countryName: string | null;
  countryId: string | null;
  users: number;
};

export default function DetailsCommunity({
  name,
  createdBy,
  validated,
  countryName,
  countryId,
  users,
}: Props) {
  return (
    <section className="">
      <h1 className="text-2xl font-bold capitalize text-cyan-900">{name}</h1>

      <p className="mt-2 text-sm text-gray-800">
        Community overview — find members, updates, and local activities.
      </p>

      {countryName && countryId && (
        <p className="mt-4 text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Country:</span>{" "}
          <Link
            href={`/community/${countryId}`}
            className="text-cyan-800 hover:text-cyan-600 underline font-semibold"
          >
            {countryName}
          </Link>
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-700">
          Created by{" "}
          <span className="font-semibold capitalize text-gray-900">
            {createdBy}
          </span>
        </span>

        {!validated && (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border">
            <span className="bg-red-100 rounded-full w-2 h-2 block" />
            Pending admin approval
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">{users}</span> members
          in this community.
        </p>
      </div>
    </section>
  );
}
