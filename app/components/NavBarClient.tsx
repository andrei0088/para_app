"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBarClient() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Sites" },
    { href: "/map", label: "Map Sites" },
    { href: "/wing-up", label: "User Area" },
  ];

  return (
    <div className="md:hidden w-full">
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
       
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col bg-white dark:bg-gray-900 w-full">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
