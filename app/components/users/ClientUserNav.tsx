"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/app/api/actions/auth";
import blankPhoto from "@/public/blank-profile.png";

export default function UserNav({ session }: { session: any }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Închide dropdown-ul dacă dai click în exterior
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session)
    return (
      <div className="flex gap-3 items-center">
        <Link
          href="/user/login"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          href="/user/register"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
        >
          Create Account
        </Link>
      </div>
    );

  return (
    <div className="relative flex items-center gap-2" ref={menuRef}>
      {/* User Name */}
      <span className="text-sm font-medium text-gray-800">{session.user.name}</span>

      {/* Avatar */}
      <Image
        src={session.user.image ?? blankPhoto}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition"
        onClick={() => setOpen(!open)}
      />

      {/* Arrow */}
      <button
        className="text-gray-500 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        ▼
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-9999">
          <Link
            href="/user/profile"
            className="block px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Edit your profile
          </Link>

          <Link
            href="/user"
            className="block px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Settings
          </Link>

          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
