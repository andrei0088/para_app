import Link from "next/link";
import {
  deleteCommunityById,
  get_community,
  validateCommunityById,
} from "./action";

interface PageProps {
  searchParams?: {
    id?: number;
    delete?: number;
  };
}

export default async function ValidateCommunity({ searchParams }: PageProps) {
  const validate = await searchParams;
  if (validate?.id) {
    await validateCommunityById(Number(validate.id));
  }
  if (validate?.delete) {
    await deleteCommunityById(Number(validate.delete));
  }
  const community = await get_community();

  return (
    <section className="  mt-10 space-y-6">
      {/* Buton Înapoi la Admin */}
      <Link
        href="/admin"
        className="inline-flex px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition"
      >
        Înapoi la Admin
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
        Comunități noi de validat
      </h1>

      {community.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          🎉 Nu există comunități de validat
        </p>
      ) : (
        <div className="grid gap-4">
          {community.map((c) => (
            <div
              key={c.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="space-y-1">
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  {c.name}{" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({c.type})
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Țară: {c.countryName || "N/A"}
                </p>
              </div>
              {/* Buton stergere */}
              <form
                method="GET"
                action="/admin/validate-community"
                className="mt-3 sm:mt-0"
              >
                <input type="hidden" name="delete" value={c.id} />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition"
                >
                  Delete
                </button>
              </form>
              {/* Buton Validate */}
              <form
                method="GET"
                action="/admin/validate-community"
                className="mt-3 sm:mt-0"
              >
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition"
                >
                  Validate
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
