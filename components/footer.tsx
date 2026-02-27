export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex flex-col items-center justify-between gap-3 py-4 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <p className="flex gap-2">
          <span className="hidden sm:inline">
            Built with Next.js, TypeScript & Tailwind CSS.
          </span>
        </p>
      </div>
    </footer>
  );
}


