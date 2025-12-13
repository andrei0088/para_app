"use client";

import { useState, useEffect } from "react";
import CookiePreferences from "./CookiePreferences";

type CookiePrefs = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

/* =======================
   COOKIE HELPERS
======================= */
function setCookie(name: string, value: string, days = 180) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

/* =======================
   COMPONENT
======================= */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [openPrefs, setOpenPrefs] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookie-consent");

    if (!consent) {
      setVisible(true);
    } else {
      const prefs: CookiePrefs = JSON.parse(consent);

      // Apply consent on page load
      window.gtag?.("consent", "update", {
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
        analytics_storage: prefs.analytics ? "granted" : "denied",
      });
    }
  }, []);

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });

    window.location.reload();
  };

  const rejectAll = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveConsent = (prefs: CookiePrefs) => {
    // Save consent in COOKIE
    setCookie("cookie-consent", JSON.stringify(prefs));

    // Google Consent Mode v2
    window.gtag?.("consent", "update", {
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
      analytics_storage: prefs.analytics ? "granted" : "denied",
    });

    setVisible(false);
    setOpenPrefs(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">We use cookies 🍪</h2>
            <p className="text-gray-600 text-sm">
              We use cookies to improve site performance, analyze traffic, and
              personalize ads. You can accept all, reject non-essential cookies,
              or manage your preferences.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={rejectAll}
            >
              Only essential
            </button>

            <button
              className="px-4 py-2 rounded bg-blue-100 border border-blue-500 text-blue-600 hover:bg-blue-200"
              onClick={() => setOpenPrefs(true)}
            >
              Customize
            </button>

            <button
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              onClick={acceptAll}
            >
              Accept all
            </button>
          </div>
        </div>
      </div>

      {openPrefs && (
        <CookiePreferences
          onSave={saveConsent}
          onClose={() => setOpenPrefs(false)}
        />
      )}
    </>
  );
}
