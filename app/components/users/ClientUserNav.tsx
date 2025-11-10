"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/app/api/actions/auth";
import blankPhoto from "@/public/blank-profile.png";
import { CldImage } from "next-cloudinary";

type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
} | null;

export default function UserNav({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <div className="flex gap-3 items-center ">
        <Link
          href="/user/login"
          className="px-3 py-1 border border-gray-300 text-gray-700 rounded  hover:bg-gray-100 transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          href="/user/register"
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-200"
        >
          Sign up
        </Link>
      </div>
    );

  return (
    <div className="relative flex items-center gap-2 " ref={menuRef}>
      {/* User Name */}
      <span className="text-sm font-medium text-gray-800 ">
        {session.user.name}
      </span>

      {/* Avatar */}
      {session.user.image ? (
        <CldImage
          src={session.user.image}
          width={36}
          height={36}
          crop="fill"
          gravity="auto"
          alt="Profile picture"
          quality="auto"
          radius="max"
          style={{ objectFit: "cover", cursor: "pointer" }}
        />
      ) : (
        <Image
          src={blankPhoto}
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => setOpen(!open)}
        />
      )}
      {/* Dropdown Arrow */}
      <button
        className="text-gray-500  focus:outline-none h-full"
        onClick={() => setOpen(!open)}
      >
        ▼
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute -right-2 top-full mt-4 w-44 bg-gray-50  rounded-md shadow-lg py-1 z-9999 ring-1 ring-gray-200 ">
          <Link
            href="/user/profile"
            className="block px-4 py-2 hover:bg-gray-100  text-sm text-gray-700  transition-colors duration-150"
          >
            Edit your profile
          </Link>
          <Link
            href="/user"
            className="block px-4 py-2 hover:bg-gray-100  text-sm text-gray-700  transition-colors duration-150"
          >
            Settings
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 hover:bg-gray-100  text-sm text-gray-700  transition-colors duration-150"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
