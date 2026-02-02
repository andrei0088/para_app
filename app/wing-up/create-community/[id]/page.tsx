import CustomCountry from "../CustomCountry";
import CustomRegion from "../CustomRegion";
import { createCountryCommunity } from "./action";

export default async function CreateCommunity({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const type = id[0];
  if (type !== "r" && type !== "c") {
    return <div>Invalid input</div>;
  }
  if (type === "c" && Number(id.slice(1)) == 0) {
    return <CustomCountry />;
  }
  if (type === "r" && Number(id.slice(1)) == 0) {
    return <CustomRegion />;
  }
  const { success, community } = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/wing-up/get-community/${id}`,
    { cache: "no-store" },
  ).then((res) => res.json());
  if (community.success) {
    return <div>Community already exists</div>;
  }
  if (success) {
    return <div>Community already exists</div>;
  }
  return (
    <div className="rounded-sm shadow p-6 space-y-4">
      <div className="text-sm text-gray-500">
        Community type:
        <span className="ml-1 font-medium text-gray-900">
          {type === "r" ? "Region" : "Country"}
        </span>
      </div>

      <h1 className="text-lg font-semibold text-gray-900">
        {type === "r"
          ? `${community.region?.name} ${community.country?.name
              .slice(0, 2)
              .toUpperCase()}`
          : community.country?.name}
      </h1>

      <form action={createCountryCommunity} className="space-y-4">
        <fieldset className="space-y-3">
          <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="localPilot"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />{" "}
            <span>
              I am a <strong>local pilot</strong> for this area *
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="allowPM"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <span>I agree to be contacted privately by other pilots</span>
          </label>

          {!community.countryCommunity && id[0] === "r" && (
            <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="countryCommunity"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span>
                Also create the <strong>country community</strong> *
              </span>
            </label>
          )}
        </fieldset>
        <input type="hidden" name="type" value={id[0]} />
        <input type="hidden" name="id" value={id.slice(1)} />
        <p className="text-xs text-gray-500">
          Fields marked with <span className="font-medium">*</span> are
          required.
        </p>{" "}
        <button
          type="submit"
          className="w-full bg-cyan-800 text-white py-3 rounded-sm text-sm font-semibold hover:bg-cyan-900 transition mt-5 disabled:text-red-100 disabled:hover:bg-cyan-800"
        >
          Create community
        </button>
      </form>
    </div>
  );
}
