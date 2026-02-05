import Link from "next/link";
import { validateCommunity } from "./validate-community/action";

export default async function NewCommunity() {
  const rez = await validateCommunity();

  return (
    <section className=" mx-auto mt-16 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-800 text-center">
      {rez === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
          🎉 Nicio comunitate de validat
        </p>
      ) : (
        <Link href={`/admin/validate-community`}>
          <p className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
            🔔 {rez} comunități așteaptă validare
          </p>
        </Link>
      )}
    </section>
  );
}
