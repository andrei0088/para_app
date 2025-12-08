import { update_region_description } from "../action";

interface EditPageProps {
  desc: string | null;
  id: number;
}

export default function EditPage({ desc, id }: EditPageProps) {
  const descJson = JSON.parse(desc || "{}");
  const transport = descJson.transport || {}; // safe fallback

  return (
    <div className="w-full p-4">
      <form action={update_region_description} className="w-full space-y-4">
        <input type="hidden" name="id" value={id} />

        {/* Title */}
        <div className="flex items-center gap-2">
          <label htmlFor="title" className="font-semibold">
            Title:
          </label>
          <input
            type="text"
            name="title"
            defaultValue={descJson.title || ""}
            className="w-full border p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-2">
          <label htmlFor="subtitle" className="font-semibold">
            Subtitle:
          </label>
          <input
            type="text"
            name="subtitle"
            defaultValue={descJson.subtitle || ""}
            className="w-full border p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Overview */}
        <div>
          <label className="font-semibold">Overview:</label>
          <textarea
            name="overview"
            defaultValue={
              Array.isArray(descJson.overview)
                ? descJson.overview.join("\n")
                : descJson.overview || ""
            }
            className="w-full h-35 border p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Transport */}
        <div>
          <label className="font-semibold">Transport:</label>
          <textarea
            name="regulations"
            defaultValue={
              Array.isArray(transport.text)
                ? transport.text.join("\n")
                : transport.text || ""
            }
            className="w-full h-35 border p-2 rounded-2xl mt-1"
          />

          <div className="flex gap-2">
            <label>Cable</label>
            <input
              type="checkbox"
              name="cable"
              defaultChecked={transport.cable}
            />

            <label>Shuttle</label>
            <input
              type="checkbox"
              name="shuttle"
              defaultChecked={transport.shuttle}
            />

            <label>Car</label>
            <input type="checkbox" name="car" defaultChecked={transport.car} />

            <label>Hike</label>
            <input
              type="checkbox"
              name="hike"
              defaultChecked={transport.hike}
            />
          </div>
        </div>

        {/* Flying conditions */}
        <div>
          <label className="font-semibold">Flying conditions:</label>
          <textarea
            name="fly"
            defaultValue={
              Array.isArray(descJson.fly)
                ? descJson.fly.join("\n")
                : descJson.fly || ""
            }
            className="w-full h-35 border p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Local Rules */}
        <div>
          <label className="font-semibold">Local Rules:</label>
          <textarea
            name="roules"
            defaultValue={
              Array.isArray(descJson.roules)
                ? descJson.roules.join("\n")
                : descJson.roules || ""
            }
            className="w-full h-35 border p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Authority */}
        <div className="flex items-center gap-2">
          <p>link:</p>
          <label className="font-semibold">URL:</label>
          <input
            type="text"
            name="autUrl"
            defaultValue={descJson.link?.url || ""}
            className="w-full border p-2 rounded-2xl mt-1"
          />

          <label className="font-semibold">Name:</label>
          <input
            type="text"
            name="autName"
            defaultValue={descJson.link?.name || ""}
            className="w-full border p-2 rounded-2xl mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}
