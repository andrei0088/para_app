import { raported } from "./admin";
import Link from "next/link";

export default async function Raported() {
  const raports = await raported();

  console.log({ raports });

  return (
    <section className=" mt-10 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Raportări
      </h1>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 divide-y divide-gray-100 dark:divide-neutral-800">
        {raports?.country?.length > 0 ? (
          <Link
            href="/admin/raported/country"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <span className="text-gray-700 dark:text-gray-300">
              Raportate de țară
            </span>
            <span className="text-sm font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-3 py-1 rounded-full">
              {raports.country.length}
            </span>
          </Link>
        ) : null}

        {raports?.region?.length > 0 ? (
          <Link
            href="/admin/raported/region"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <span className="text-gray-700 dark:text-gray-300">
              Raportate de regiune
            </span>
            <span className="text-sm font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-3 py-1 rounded-full">
              {raports.region.length}
            </span>
          </Link>
        ) : null}

        {raports?.takeoff?.length > 0 ? (
          <Link
            href="/admin/raported/takeoff"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <span className="text-gray-700 dark:text-gray-300">
              Raportate de decolări
            </span>
            <span className="text-sm font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-3 py-1 rounded-full">
              {raports.takeoff.length}
            </span>
          </Link>
        ) : null}

        {raports?.landing?.length > 0 ? (
          <Link
            href="/admin/raported/landing"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <span className="text-gray-700 dark:text-gray-300">
              Raportate de aterizare
            </span>
            <span className="text-sm font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-3 py-1 rounded-full">
              {raports.landing.length}
            </span>
          </Link>
        ) : null}

        {raports?.posts?.length > 0 ? (
          <Link
            href="/admin/raported/posts"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <span className="text-gray-700 dark:text-gray-300">
              Raportate Postări comunitate
            </span>
            <span className="text-sm font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-3 py-1 rounded-full">
              {raports.posts.length}
            </span>
          </Link>
        ) : null}
      </div>

      {!raports ||
      Object.values(raports).every((arr) => !arr || arr.length === 0) ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          Nu există raportări 🎉
        </p>
      ) : null}
    </section>
  );
}
