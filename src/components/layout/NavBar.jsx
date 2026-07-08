"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/find-talent", label: "Hire Talent" },
  { href: "/find-jobs", label: "Find Jobs" },
  { href: "/marketplace", label: "Buy & Sell locally" },
  { href: "/why-kopalet", label: "Why Kopalet?" },
  { href: "/solutions", label: "Solutions" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
      <nav className="mx-auto flex h-16 w-full max-w-300 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-(family-name:--font-orbitron) text-2xl md:text-3xl font-bold tracking-wide text-black dark:text-white"
        >
          Kopalet
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "text-sm font-medium text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white",
                  isActive(link.href) &&
                    "font-semibold text-black dark:text-white",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button asChild variant="ghost" size="sm">
            <a href={process.env.NEXT_PUBLIC_APP_URL || "#"}>Log In</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-black text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
          >
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || "#"}/register`}>
              Create Account
            </a>
          </Button>
        </div>

        {/* Mobile: logo — create account — hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
          >
            <a href={`${process.env.NEXT_PUBLIC_APP_URL || "#"}/register`}>
              Create Account
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label="Open menu">
                {/* <Menu className="h-10 w-10" /> */}
                Menu Open
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 px-6 border-black/10 bg-white dark:border-white/10 dark:bg-black"
            >
              <div className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-lg font-large text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 mb-4",
                        isActive(link.href) &&
                          "font-semibold text-black dark:text-white",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-black/10 pt-6 dark:border-white/10">
                {mounted && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </Button>
                )}
                <SheetClose asChild>
                  <Button asChild className="w-full" size="lg">
                    <a href={process.env.NEXT_PUBLIC_APP_URL || "#"}>
                      Create Account
                    </a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <a href={process.env.NEXT_PUBLIC_APP_URL || "#"}>Log In</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
