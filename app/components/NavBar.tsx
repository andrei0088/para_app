import Link from "next/link";
import UserNav from "./users/UserNav";
import NavBarClient from "./NavBarClient";

export default function NavBarServer() {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      {/* Desktop */}
      <div className="hidden md:flex max-w-7xl mx-auto px-2  justify-between items-center">
        {/* Meniu principal */}
        <ul className="flex gap-8">
          <li>
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
            >
              Explore Sites
            </Link>
          </li>
          <li>
            <Link
              href="/map"
              className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
            >
              Map Sites
            </Link>
          </li>
          <li>
            <Link
              href="/wing-up"
              className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
            >
              User Area
            </Link>
          </li>
        </ul>

        {/* UserNav */}
        <UserNav />
      </div>

     {/* Mobile */}
{/* Mobile */}
<div className="relative md:hidden bg-white dark:bg-gray-900 shadow-md px-4 py-2 flex items-center justify-between">

  {/* Burger menu / NavBarClient */}
  <NavBarClient />

  {/* UserNav în colț dreapta sus */}
  <div className="absolute right-4 top-2">
    <UserNav />
  </div>

</div>

    </nav>
  );
}
