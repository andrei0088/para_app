import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RightBar from "./components/RightBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ParaAPP - Paragliding High",
  description: "Discover the world's most iconic paragliding destinations and learn everything about paragliding. From breathtaking landscapes to expert tips, explore the thrill of flying with our comprehensive guides and inspiring stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NavBar />
        {/* Containerul principal */}
<div className="flex flex-1">
    <div className="flex-7 p-5">
              <Analytics />
              {children}
      </div>
    <div className="flex-1">
      <RightBar />
    </div>
  </div>  
  <Footer />
      </body>
    </html>
  );
}
