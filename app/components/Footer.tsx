import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-xl font-bold text-green-500">Paragliding High</h1>
          <p className="text-sm mt-1">&copy; {new Date().getFullYear()} Paragliding High. All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <Link href="/wing-up" className="hover:text-green-500 transition-colors">
            About
          </Link>
          <Link href="/wing-up" className="hover:text-green-500 transition-colors">
            Contact
          </Link>
          <Link href="/user/tnc" className="hover:text-green-500 transition-colors">
            Terms
          </Link>
          <Link href="/wing-up" className="hover:text-green-500 transition-colors">
            Privacy
          </Link>
        </div>
      </div>

      {/* Optional: social media icons */}
      <div className="border-t border-gray-700 mt-4 pt-4">
        <div className="max-w-6xl mx-auto flex justify-center space-x-4">
          <a href="https://www.facebook.com/paraglidinghigh" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
            Facebook
          </a>
          <a href="https://www.instagram.com/paragliding_high/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
            Instagram
          </a>

          <a href="https://www.youtube.com/@paragliding_high" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
            Youtube
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
