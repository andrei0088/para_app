import { update_takeoff_description } from "../action";

interface EditPageProps {
  desc: string | null;
  id: number;
}

export default function EditPage({ desc, id }: EditPageProps) {
  const descJson = JSON.parse(desc || "{}");
  console.log(descJson.takeoffDifficulty);
  return (
    <div className="w-full p-4">
      <form action={update_takeoff_description} className="w-full space-y-4">
        {/* Description */}
        <input type="hidden" name="id" value={id} />
        <div>
          <label htmlFor="description" className="font-semibold">
            Description:
          </label>
          <textarea
            name="description"
            defaultValue={descJson.description || ""}
            className="w-full h-32 border-2 p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Access */}
        <div className="space-y-2">
          <p className="font-semibold">Access:</p>

          {/* Parking */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Parking:</label>
            <label>
              <input
                type="radio"
                name="parking"
                value="yes"
                defaultChecked={descJson.access?.parking === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="parking"
                value="no"
                defaultChecked={descJson.access?.parking === false}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="parking"
                value=""
                defaultChecked={descJson.access?.parking === undefined}
              />
              Undefined
            </label>
          </div>

          {/* Road Conditions */}
          <div className="w-full flex items-center gap-2">
            <label htmlFor="roadConditions" className="whitespace-nowrap">
              Road Condition:
            </label>
            <input
              type="text"
              name="roadConditions"
              defaultValue={descJson.access?.roadConditions || ""}
              className="border-2 rounded-xl p-2 flex-1"
            />
          </div>

          {/* Cable to Takeoff */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Cable to Takeoff:</label>
            <label>
              <input
                type="radio"
                name="cableToTakeoff"
                value="yes"
                defaultChecked={descJson.access?.cableToTakeoff === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="cableToTakeoff"
                value="no"
                defaultChecked={descJson.access?.cableToTakeoff === false}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="cableToTakeoff"
                value=""
                defaultChecked={descJson.access?.cableToTakeoff === undefined}
              />
              No information
            </label>
          </div>

          {/* Shuttle to Takeoff */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Shuttle to Takeoff:</label>
            <label>
              <input
                type="radio"
                name="shuttleToTakeoff"
                value="yes"
                defaultChecked={descJson.access?.shuttleToTakeoff === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="shuttleToTakeoff"
                value="no"
                defaultChecked={descJson.access?.shuttleToTakeoff === false}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="shuttleToTakeoff"
                value=""
                defaultChecked={descJson.access?.shuttleToTakeoff === undefined}
              />
              Undefined
            </label>
          </div>

          {/* Access Notes */}
          <div>
            <label htmlFor="accessNotes" className="font-semibold">
              Access Notes:
            </label>
            <textarea
              name="accessNotes"
              defaultValue={descJson.access?.notes || ""}
              className="w-full h-20 border-2 p-2 rounded-2xl mt-1"
            />
          </div>
        </div>

        {/* Facilities */}
        <div className="space-y-2">
          <p className="font-semibold">Contact Website:</p>

          {/* Contact Website */}
          <div className="w-full flex items-center gap-2">
            <label htmlFor="contactWebsite" className="whitespace-nowrap">
              URL:
            </label>
            <input
              type="text"
              name="contactWebsiteUrl"
              defaultValue={descJson.contactWebsite.url || ""}
              className="border-2 rounded-xl p-2 flex-1"
            />
            <label htmlFor="contactWebsite" className="whitespace-nowrap">
              Name:
            </label>
            <input
              type="text"
              name="contactWebsiteName"
              defaultValue={descJson.contactWebsite.name || ""}
              className="border-2 rounded-xl p-2 flex-1"
            />
          </div>
        </div>

        {/* Safety */}
        <div className="space-y-2">
          <p className="font-semibold">Safety:</p>

          {/* Takeoff Difficulty */}
          <div className="w-full flex items-center gap-2">
            <label htmlFor="takeoffDifficulty" className="whitespace-nowrap">
              Takeoff Difficulty:
            </label>
            <select
              name="takeoffDifficulty"
              defaultValue={descJson.takeoffDifficulty || ""}
              className="border-2 rounded-xl p-2 flex-1"
            >
              <option value=""></option>

              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Safety Notes */}
          <div>
            <label htmlFor="safetyNotes" className="font-semibold">
              Safety Notes:
            </label>
            <textarea
              name="safetyNotes"
              defaultValue={descJson.notes || ""}
              className="w-full h-20 border-2 p-2 rounded-2xl mt-1"
            />
          </div>
        </div>

        {/* General Notes */}
        <div>
          <label htmlFor="notes" className="font-semibold">
            General Notes:
          </label>
          <textarea
            name="notes"
            defaultValue={descJson.notes || ""}
            className="w-full h-20 border-2 p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
