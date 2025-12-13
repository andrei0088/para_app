"use client";

import { useState } from "react";

export default function CookiePreferences({
  onSave,
  onClose,
}: {
  onSave: (v: any) => void;
  onClose: () => void;
}) {
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const update = (key: string) =>
    setPrefs({ ...prefs, [key]: !prefs[key as keyof typeof prefs] });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Cookie Preferences</h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between border p-3 rounded">
            <div>
              <h3 className="font-semibold">Essential cookies</h3>
              <p className="text-sm text-gray-600">
                Required for the site to function.
              </p>
            </div>
            <input type="checkbox" checked disabled />
          </label>

          <label className="flex items-center justify-between border p-3 rounded">
            <div>
              <h3 className="font-semibold">Analytics cookies</h3>
              <p className="text-sm text-gray-600">
                Used for analytics (Google Analytics 4).
              </p>
            </div>
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={() => update("analytics")}
            />
          </label>

          <label className="flex items-center justify-between border p-3 rounded">
            <div>
              <h3 className="font-semibold">Marketing cookies</h3>
              <p className="text-sm text-gray-600">
                Used for ads personalization (Google Ads/AdSense).
              </p>
            </div>
            <input
              type="checkbox"
              checked={prefs.marketing}
              onChange={() => update("marketing")}
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            onClick={() => onSave(prefs)}
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}
