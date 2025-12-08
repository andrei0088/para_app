import Link from "next/link";
import UserNav from "./users/UserNav";
import NavBarClient from "./NavBarClient";
import { Suspense } from "react";

export default function NavBarServer() {
  return (
    <nav className="w-full xl:w-[80vw] mx-auto bg-gray-50  shadow-md h-16">
      {/* Desktop */}
      <div className="hidden md:flex max-w-full mx-auto pl-4 justify-between items-center h-full">
        {/* Logo + Menu */}
        <div className="flex items-center gap-10 h-full ml-5">
          <ul className="flex gap-8 text-gray-700 ">
            <li>
              <Link
                href="/"
                className="hover:text-green-500  transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="hover:text-green-500  transition-colors duration-200"
              >
                Explore Sites
              </Link>
            </li>
            <li>
              <Link
                href="/map"
                className="hover:text-green-500  transition-colors duration-200"
              >
                Map Sites
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-green-500  transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/wing-up"
                className="hover:text-green-500  transition-colors duration-200"
              >
                User Area
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-green-500  transition-colors duration-200"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* UserNav */}
        <Suspense fallback={<div>Loading...</div>}>
          <UserNav wstyle={"desktop"} />
        </Suspense>
      </div>

      {/* Mobile */}
      {/* Mobile */}
      <div className="relative md:hidden bg-white  shadow-md flex items-center justify-between h-full">
        {/* Burger menu / NavBarClient */}
        <NavBarClient />

        {/* UserNav în colț dreapta sus */}
        <div className="absolute right-0 top-0">
          <Suspense fallback={<div>Loading...</div>}>
            <UserNav wstyle={"mobile"} />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
