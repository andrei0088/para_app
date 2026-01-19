import "./globals.css";
import RightBar from "./components/RightBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Roboto, Oswald } from "next/font/google";
import Banner from "./components/Banner";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { Metadata } from "next";
import Cookie from "./components/Cookie";
import { cookies } from "next/headers";
import UnderConstruction from "./components/UnderConstruction";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
export const metadata: Metadata = {
  title: "ParaUp – your paragliding journey",
  description:
    "Discover the best paragliding spots around the world. Join our community of pilots, share your experiences, and grow the international paragliding network.",
};

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const consent = cookieStore.get("cookie-consent");

  let analyticsAccepted = false;

  if (consent) {
    try {
      const prefs = JSON.parse(consent.value);
      analyticsAccepted = prefs.analytics === true;
    } catch {}
  }

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${oswald.variable} antialiased  flex flex-col  `}
      >
        <Cookie />
        {analyticsAccepted && (
          <>
            <Analytics />
            <SpeedInsights />
            <GoogleAnalytics />
          </>
        )}
        <UnderConstruction />
        <div className="w-full md:w-[90vw] xl:w-[80vw]  md:mx-auto mx-auto ">
          <Banner />
          <NavBar />
        </div>

        {/* Main + RightBar */}
        <div className=" pl-px  flex flex-col lg:flex-row  bg-white w-full md:w-[90vw] xl:w-[80vw]  md:mx-auto mx-auto ">
          {/* Content principal */}
          <main className="flex-1 flex flex-col overflow-auto  border-l border-gray-50 pb-5 ">
            {children}

            {/* <!-- Google Tag Manager (noscript) --> */}
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-TNFPLFK7"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
            {/* <!-- End Google Tag Manager (noscript) --> */}
          </main>

          {/* RightBar */}
          <aside className="w-full lg:w-64 mt-4 lg:mt-0 lg:shrink-0 lg:flex lg:flex-col ">
            <RightBar />
          </aside>
        </div>

        <Footer />
      </body>
    </html>
  );
}
