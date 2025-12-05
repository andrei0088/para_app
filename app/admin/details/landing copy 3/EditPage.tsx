import { update_landing_description } from "../action";

interface EditPageProps {
  desc: string | null;
  id: number;
}

export default function EditPage({ desc, id }: EditPageProps) {
  const descJson = JSON.parse(desc || "{}");

  return (
    <div className="w-full p-4">
      <form action={update_landing_description} className="w-full space-y-4">
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

          {/* Public Transport */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Public Transport:</label>
            <label>
              <input
                type="radio"
                name="publicTransport"
                value="yes"
                defaultChecked={descJson.access?.publicTransport === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="publicTransport"
                value="no"
                defaultChecked={descJson.access?.publicTransport === false}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="publicTransport"
                value=""
                defaultChecked={descJson.access?.publicTransport === undefined}
              />
              Undefined
            </label>
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
          <p className="font-semibold">Facilities:</p>

          {/* Toilets */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Toilets:</label>
            <label>
              <input
                type="radio"
                name="toilets"
                value="yes"
                defaultChecked={descJson.facilities?.toilets === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="toilets"
                value="no"
                defaultChecked={descJson.facilities?.toilets === false}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="toilets"
                value=""
                defaultChecked={descJson.facilities?.toilets === undefined}
              />
              Undefined
            </label>
          </div>

          {/* Food Nearby */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Food Nearby:</label>
            <label>
              <input
                type="radio"
                name="foodNearby"
                value="yes"
                defaultChecked={descJson.facilities?.foodNearby === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="foodNearby"
                value="no"
                defaultChecked={descJson.facilities?.foodNearby === false}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="foodNearby"
                value=""
                defaultChecked={descJson.facilities?.foodNearby === undefined}
              />
              Undefined
            </label>
          </div>

          {/* Camping */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Camping:</label>
            <label>
              <input
                type="radio"
                name="camping"
                value="yes"
                defaultChecked={descJson.facilities?.camping === true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="camping"
                value="no"
                defaultChecked={descJson.facilities?.camping === false}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="camping"
                value=""
                defaultChecked={descJson.facilities?.camping === undefined}
              />
              Undefined
            </label>
          </div>

          {/* Contact Website */}
          <div className="w-full flex items-center gap-2">
            <label htmlFor="contactWebsite" className="whitespace-nowrap">
              Contact Website:
            </label>
            <input
              type="text"
              name="contactWebsite"
              defaultValue={descJson.facilities?.contactWebsite || ""}
              className="border-2 rounded-xl p-2 flex-1"
            />
          </div>
        </div>

        {/* Safety */}
        <div className="space-y-2">
          <p className="font-semibold">Safety:</p>

          {/* Landing Difficulty */}
          <div className="w-full flex items-center gap-2">
            <label htmlFor="landingDifficulty" className="whitespace-nowrap">
              Landing Difficulty:
            </label>
            <input
              type="text"
              name="landingDifficulty"
              defaultValue={descJson.safety?.landingDifficulty || ""}
              className="border-2 rounded-xl p-2 flex-1"
            />
          </div>

          {/* Common Hazards */}
          <div>
            <label htmlFor="commonHazards" className="font-semibold">
              Common Hazards (comma separated):
            </label>
            <input
              type="text"
              name="commonHazards"
              defaultValue={descJson.safety?.commonHazards?.join(", ") || ""}
              className="w-full border-2 rounded-xl p-2 mt-1"
            />
          </div>

          {/* Safety Notes */}
          <div>
            <label htmlFor="safetyNotes" className="font-semibold">
              Safety Notes:
            </label>
            <textarea
              name="safetyNotes"
              defaultValue={descJson.safety?.notes || ""}
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
