"use client";
import { useState, useEffect } from "react";
import { update_country_description } from "../action";

interface EditPageProps {
  desc: string | null;
  id: number;
}

export default function EditPage({ desc, id }: EditPageProps) {
  const descJson = JSON.parse(desc || "{}");

  const customObj = descJson.custom || {}; // obiectul custom
  const customKeys = Object.keys(customObj); // numele câmpurilor custom

  // index-ul este numărul de câmpuri custom existente
  const [index, setIndex] = useState(customKeys.length);

  // sincronizează index-ul dacă se schimbă desc
  useEffect(() => {
    setIndex(customKeys.length);
  }, [customKeys.length]);

  const elements = [];
  for (let i = 0; i < index; i++) {
    const fieldName = customKeys[i] || ""; // numele câmpului
    const fieldValue = customObj[fieldName] || ""; // valoarea câmpului

    elements.push(
      <div key={i} className="space-y-2">
        {/* Numele câmpului */}
        <label className="font-semibold">
          Custom Description {i + 1} name:
        </label>
        <input
          type="text"
          name={`custom_name_${i}`}
          defaultValue={fieldName}
          className="w-1/2 border p-2 rounded-2xl mt-1"
        />

        {/* Textul descrierii */}
        <label className="font-semibold block mt-2">Content:</label>
        <textarea
          name={`custom_value_${i}`}
          defaultValue={
            Array.isArray(fieldValue) ? fieldValue.join("\n") : fieldValue
          }
          className="w-full h-35 border p-2 rounded-2xl mt-1"
        />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <form action={update_country_description} className="w-full space-y-4">
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

        {/* Regulations */}
        <div>
          <label className="font-semibold">Regulations:</label>
          <textarea
            name="regulations"
            defaultValue={
              Array.isArray(descJson.regulations)
                ? descJson.regulations.join("\n")
                : descJson.regulations || ""
            }
            className="w-full h-35 border p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Authority */}
        <div className="flex items-center gap-2">
          <p>Authority:</p>
          <label className="font-semibold">URL:</label>
          <input
            type="text"
            name="autUrl"
            defaultValue={descJson.authority?.url || ""}
            className="w-full border p-2 rounded-2xl mt-1"
          />

          <label className="font-semibold">Name:</label>
          <input
            type="text"
            name="autName"
            defaultValue={descJson.authority?.name || ""}
            className="w-full border p-2 rounded-2xl mt-1"
          />
        </div>

        {/* Buttons adăugare / ștergere câmpuri custom */}
        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Add Custom Field
        </button>

        <button
          type="button"
          onClick={() => setIndex(Math.max(0, index - 1))}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Remove Last Custom Field
        </button>

        {/* Câmpurile custom */}
        {elements}

        {/* Save */}
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
