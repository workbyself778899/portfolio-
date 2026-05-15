"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItems = {
  path: string;
  label: string;
};

const navItems: NavItems[] = [
  { path: "/admin/home", label: "Home" },
  { path: "/admin/skill", label: "Skills" },
  { path: "/admin/projects", label: "Projects" },
  { path: "/admin/resumes", label: "Experience" },
  { path: "/admin/contact", label: "Contact" },
  { path: "/admin/message", label: "Messages" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-3 py-3">
        <p className="text-sm font-semibold sm:text-base">Admin Panel</p>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle admin menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <nav
        className={`border-t border-border lg:border-t-0 ${
          menuOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="container flex max-h-[calc(100dvh-4.5rem)] flex-col gap-1 overflow-y-auto py-3 lg:max-h-none lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-2 lg:py-0 lg:pb-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (pathname === "/admin" && item.path === "/admin/home");
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm transition sm:px-4 sm:text-base ${
                  isActive
                    ? "bg-sky-600 font-semibold text-white shadow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
