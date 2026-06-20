"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // 1. Define base links inside the component frame to prevent push pollution
  const baseLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Startups", href: "/allstartups" },
    { label: "Browse Opportunities", href: "/allopportunities" },
  ];

  const dashboardLinks = {
    founder: "/dashboard/founder",
    collaborator: "/dashboard/collaborator",
    admin: "/dashboard/admin",
  };

  // 2. Safely compute the final array based on the active user state
  const computedNavLinks = [...baseLinks];
  if (user?.email) {
    computedNavLinks.push({
      label: "Dashboard",
      href: dashboardLinks[user?.role] || "/dashboard/collaborator",
    });
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-zinc-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <Link href="/">
              <p className="font-bold text-zinc-900">Startup Forge</p>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Map Layout */}
        <ul className="hidden items-center gap-6 md:flex">
          {computedNavLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Action Controls */}
        {user ? (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/${user?.role}/profile`}>
              <div className="rounded-full border-2 border-green-500 overflow-hidden">
                <Image
                  src={user?.image || "/fallback-avatar.png"}
                  width={30}
                  height={30}
                  alt="userimage"
                  className="rounded-full object-cover"
                />
              </div>
            </Link>
            <Button
              color="danger"
              variant="light"
              size="sm"
              className="font-semibold text-red-500"
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/";
              }}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/auth/login"
              className="text-sm text-zinc-600 font-medium"
            >
              Login
            </Link>
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="bg-zinc-900 text-white font-medium rounded-xl"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="border-t border-zinc-200 md:hidden bg-white">
          <ul className="flex flex-col gap-1 p-4">
            {computedNavLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="block py-2.5 px-2 text-zinc-700 hover:bg-zinc-50 rounded-xl text-sm font-medium transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {user ? (
              <li className="pt-2 mt-2 border-t border-zinc-100">
                <div className="flex items-center gap-3 py-2">
                  <Link
                    href={`/dashboard/${user?.role}/profile`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="shrink-0 rounded-full border-2 border-green-500 overflow-hidden">
                      <Image
                        src={user?.image || "/fallback-avatar.png"}
                        width={30}
                        height={30}
                        alt="userimage"
                        className="rounded-full object-cover"
                      />
                    </div>
                  </Link>
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    className="font-semibold ml-auto"
                    onClick={async () => {
                      await authClient.signOut();
                      window.location.href = "/";
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </li>
            ) : (
              <li className="pt-2 mt-2 border-t border-zinc-100">
                <div className="flex flex-col gap-2 w-full">
                  <Link
                    href="/auth/login"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="light"
                      className="w-full font-medium text-zinc-700"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full font-medium bg-zinc-900 text-white rounded-xl">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
