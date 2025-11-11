import type { Metadata } from "next";
import "./globals.css";
import RightBar from "./components/RightBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Roboto, Oswald } from "next/font/google";
import Banner from "./components/Banner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "ParaAPP - Paragliding High",
  description:
    "Discover the world's most iconic paragliding destinations and learn everything about paragliding. From breathtaking landscapes to expert tips, explore the thrill of flying with our comprehensive guides and inspiring stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${oswald.variable} antialiased min-h-screen flex flex-col `}
      >
        <Banner />
        <NavBar />

        {/* Main + RightBar */}
        <div className="flex flex-1 flex-col lg:flex-row min-h-0 bg-white">
          {/* Content principal */}
          <main className="flex-1 flex flex-col overflow-auto px-1 md:px-2">
            <Analytics />
            <SpeedInsights />
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
          <aside className="w-full lg:w-64 mt-4 lg:mt-0 lg:shrink-0 lg:flex lg:flex-col">
            <RightBar />
          </aside>
        </div>

        <Footer />
      </body>
    </html>
  );
}
