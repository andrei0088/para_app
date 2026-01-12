import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="w-full md:w-[90vw] xl:w-[80vw] mx-auto px-6 py-2 flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <div className="w-30 ">
            <Image src={logo} alt="ParaUP logo" />
          </div>
          <p className="text-sm mt-1">
            &copy; {new Date().getFullYear()} Paragliding High. All rights
            reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 ">
          <Link
            href="/about"
            className="hover:text-green-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-900 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/user/tnc"
            className="hover:text-green-900 transition-colors"
          >
            Terms & Privacy
          </Link>
        </div>
      </div>

      {/* Optional: social media icons */}
      <div className="border-t border-gray-100 mt-2 pt-4">
        <div className="max-w-6xl mx-auto flex justify-center space-x-4 mb-5">
          <a
            href="https://www.facebook.com/paraglidinghigh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-900 transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/paragliding_high/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-900 transition-colors"
          >
            Instagram
          </a>

          <a
            href="https://www.youtube.com/@paragliding_high"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-900 transition-colors"
          >
            Youtube
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
