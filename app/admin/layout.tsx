"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resumes", label: "Resumes" },
  { id: "contact", label: "Contact" },
  { id: "messages", label: "Messages" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentSection = pathname?.replace(/^\/admin\/?/, "") || "home";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              ← Back to site
            </Link>
            <Link href="/admin/home" className="text-lg font-semibold text-foreground hover:text-sky-400">
              Admin Panel
            </Link>
          </div>
        </div>
        <nav className="container -mb-px flex gap-1 overflow-x-auto pb-0">
          {SECTIONS.map((section) => {
            const href = `/admin/${section.id}`;
            const isActive = currentSection === section.id;
            return (
              <Link
                key={section.id}
                href={href}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="container py-8">{children}</main>
    </div>
  );
}
