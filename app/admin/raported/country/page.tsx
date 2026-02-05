import {
  get_country_report,
  delete_country_report,
  erese_notification,
} from "../action";
import Link from "next/link";

interface PageProps {
  searchParams?: {
    delete?: string;
    notification?: string;
  };
}

export default async function RaportedCountry({ searchParams }: PageProps) {
  const query = await searchParams;
  if (query?.delete) {
    await delete_country_report(query.delete);
  }
  if (query?.notification) await erese_notification(query.notification, "c");
  const raports = await get_country_report();

  return (
    <section className=" mt-10 space-y-4">
      <Link
        href="/admin"
        className="inline-flex mt-6 px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition"
      >
        Înapoi la Admin
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Comentarii raportate pe țară
      </h1>

      {raports.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          Nu există comentarii raportate 🎉
        </p>
      )}

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 divide-y divide-gray-100 dark:divide-neutral-800">
        {raports.map((r) => (
          <div
            key={r.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <div className="space-y-1">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">User:</span> {r.userName}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Comentariu:</span> {r.comment}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                <span className="font-semibold">Raportări:</span> {r.report} |{" "}
                <span>ID tara: </span> {r.countryId}{" "}
                <Link href={`/country/${r.countryId}`}>Link</Link>
              </p>
            </div>

            {/* Form pentru ștergere notificare */}
            <form method="GET" action="/admin/raported/country">
              <input type="hidden" name="notification" value={r.id} />
              <button
                type="submit"
                className=" justify-end mt-2 sm:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white rounded-xl text-sm font-medium  transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Șterge notificarea
              </button>
            </form>

            {/* Form pentru ștergere */}
            <form method="GET" action="/admin/raported/country">
              <input type="hidden" name="delete" value={r.id} />
              <button
                type="submit"
                className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition"
              >
                Șterge
              </button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
