"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* --- Google Analytics (GA4) --- */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8QCTXYZH6H"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8QCTXYZH6H');
        `}
      </Script>

      {/* --- Google AdSense --- */}
      <Script
        id="adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5183818618154019"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
