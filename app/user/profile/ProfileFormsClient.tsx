"use client";

import React, { useState } from "react";
import { change_profile } from "./get_profile";

interface ProfileFormsProps {
  initialData: {
    public: boolean;
    sex: "m" | "f" | "";
    bio: string | null;
    bdate: string | Date;
    showAge: boolean;
  };
}

export default function ProfileFormsClient({ initialData }: ProfileFormsProps) {
  const formattedBdate =
    typeof initialData.bdate === "string"
      ? initialData.bdate
      : initialData.bdate.toISOString().split("T")[0];

  const [formState, setFormState] = useState({
    public: initialData.public ? "yes" : "no",
    sex: initialData.sex,
    bio: initialData.bio ?? "",
    showAge: initialData.showAge ? "yes" : "no", // reflectă valoarea reală
    bdate: formattedBdate,
  });

  const [formMessage, setFormMessage] = useState("");

  const handleProfileChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      if (key === "showAge" || key === "public") {
        formData.append(key, value === "yes" ? "true" : "false");
      } else {
        formData.append(key, value);
      }
    });

    const res = await change_profile(formData);
    if (res.success) setFormMessage("✅ Profile updated successfully!");
    else setFormMessage(`❌ Error: ${res.message}`);
  };

  return (
    <form
      onSubmit={handleProfileChange}
      className="w-full flex flex-col gap-6 p-5"
    >
      {/* Sex */}
      <div>
        <label className="block font-semibold mb-1 text-gray-800 ">Sex</label>
        <div className="flex gap-6 text-gray-800 ">
          {["m", "f", ""].map((val) => (
            <label key={val} className="flex items-center gap-2">
              <input
                type="radio"
                name="sex"
                value={val}
                checked={formState.sex === val}
                onChange={(e) =>
                  setFormState((p) => ({
                    ...p,
                    sex: e.target.value as "m" | "f" | "",
                  }))
                }
              />
              {val === "m"
                ? "Male"
                : val === "f"
                ? "Female"
                : "Prefer not to say"}
            </label>
          ))}
        </div>
      </div>

      {/* Birthdate */}
      <div>
        <label className="block font-semibold mb-1 text-gray-800 ">
          Birth date
        </label>
        <input
          type="date"
          name="bdate"
          value={formState.bdate}
          onChange={(e) =>
            setFormState((p) => ({ ...p, bdate: e.target.value }))
          }
          className="w-full border px-3 py-2 rounded bg-white  text-gray-900  focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Show Age */}
      <div>
        <label className="block font-semibold mb-1 text-gray-800 ">
          Show age on profile?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="showAge"
              value="yes"
              checked={formState.showAge === "yes"}
              onChange={(e) =>
                setFormState((p) => ({ ...p, showAge: e.target.value }))
              }
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="showAge"
              value="no"
              checked={formState.showAge === "no"}
              onChange={(e) =>
                setFormState((p) => ({ ...p, showAge: e.target.value }))
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block font-semibold mb-1 text-gray-800 ">Bio</label>
        <textarea
          name="bio"
          value={formState.bio}
          onChange={(e) => setFormState((p) => ({ ...p, bio: e.target.value }))}
          rows={5}
          className="w-full border px-3 py-2 rounded bg-white  text-gray-900  focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="px-4 py-2 border border-gray-300  rounded-md font-medium text-gray-900  hover:bg-gray-100  transition"
      >
        Save Profile
      </button>

      {formMessage && (
        <p className="text-center text-sm mt-2 text-gray-600 ">{formMessage}</p>
      )}
    </form>
  );
}
