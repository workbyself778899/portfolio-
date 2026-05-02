"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItems = {
  path: string;
  label: string;
};

const navItems: NavItems[] = [
  { path: "/admin/home", label: "Home" },
  { path: "/admin/skill", label: "Skills" },
  { path: "/admin/projects", label: "Projects" },
  { path: "/admin/resumes", label: "Experience & Education" },
  { path: "/admin/contact", label: "Contact" },
  { path: "/admin/message", label: "Messages" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full  flex justify-end shadow-md ">

      <div className="w-full  max-w-5xl px-4 py-2 flex flex-col md:flex-row items-end lg:items-center justify-end">
        {/* Hamburger (Mobile Only) */}
        <button
          className="md:hidden text-2xl   mb-2 md:mb-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        
        {/* Navigation + ThemeToggle */}
        <nav
          className={`flex  flex-col md:flex-row items-center justify-end  gap-2 md:gap-4 w-full md:w-auto transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"}
          `}
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (pathname === "/admin" && item.path === "/admin/home");
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-semibold shadow"
                      : "hover:text-blue-600"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
          {/* ThemeToggle Button */}
          <div className="mt-2 mx-3 md:mt-0">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}