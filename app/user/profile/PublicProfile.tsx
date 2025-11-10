"use client";
import { changePublic } from "./get_profile";

interface PublicProfileProps {
  isPublic: boolean;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ isPublic }) => {
  return (
    <form
      action={changePublic}
      className="flex flex-wrap items-center gap-2 my-2 max-w-full"
    >
      <label
        htmlFor="public"
        className="font-medium text-gray-700 whitespace-nowrap flex-shrink-0"
      >
        Make your profile public? {isPublic ? "🟢" : "🔴"}
      </label>

      <select
        name="public"
        id="public"
        defaultValue={"yes"}
        className="flex-1  border border-gray-300 rounded-md bg-white text-gray-900 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
      >
        <option value="yes">Yes (visible to everyone)</option>
        <option value="no">No (no one can see)</option>
      </select>

      <button
        type="submit"
        className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-900 hover:bg-gray-100 transition"
      >
        Change
      </button>
    </form>
  );
};

export default PublicProfile;
