"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBarClient() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Sites" },
    { href: "/map", label: "Map" },
    { href: "/contact", label: "Contact" },
    { href: "/wing-up", label: "User Area" },
    { href: "/about", label: "About" },
  ];

  // Închide meniul când dai click în afara lui
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="md:hidden w-full text-gray-800">
      {/* Bara de meniu */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Meniul */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-md z-50"
          ref={menuRef}
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)} // închide meniul când dai click pe link
              className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
