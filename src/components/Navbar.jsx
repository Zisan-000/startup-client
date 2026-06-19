"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  //   console.log(user);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
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
            <p className="font-bold">Startup Forge</p>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link
              href="/"
              //   className="font-medium text-accent"
              aria-current="page"
            >
              Browse Startups
            </Link>
          </li>
          <li>
            <Link href="/allopportunities">Browse Opportunities</Link>
          </li>
        </ul>

        {user ? (
          // AUTHENTICATED STATE: Logged-in controls displayed inline
          <div className="flex items-center">
            <Link href="/profile">
              <div className="rounded-full border-2 border-green-500">
                <Image
                  src={user?.image}
                  width={30}
                  height={30}
                  alt="userimage"
                  className="rounded-full"
                />
              </div>
            </Link>
            {/* 2. Dashboard Navigation Button */}
            <Link href="/dashboard/founder">
              <Button
                variant="flat"
                color="warning"
                size="sm"
                className="font-semibold"
              >
                Dashboard
              </Button>
            </Link>

            {/* 3. Logout Action Button */}
            <Button
              color="danger"
              variant="light"
              size="sm"
              className="font-semibold"
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
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 font-medium text-accent">
                Browse Startups
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Browse Opportunities
              </Link>
            </li>

            {user ? (
              <li>
                <div className="flex items-center gap-3 py-2">
                  <Link href="/profile">
                    <div className="shrink-0 rounded-full border-2 border-red-500 overflow-hidden">
                      <Image
                        src={user?.image || "/fallback-avatar.png"} // Safeguarded in case image string is null
                        width={30}
                        height={30}
                        alt="userimage"
                        className="rounded-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* 2. Dashboard Navigation Button */}
                  <Link href="/dashboard" className="flex-1">
                    <Button
                      variant="flat"
                      color="warning"
                      size="sm"
                      className="font-semibold w-full"
                    >
                      Dashboard
                    </Button>
                  </Link>

                  {/* 3. Logout Action Button */}
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    className="font-semibold"
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
              <li>
                {/* FIXED: Removed 'hidden md:flex' which hid the elements on mobile viewports */}
                <div className="flex flex-col gap-2 w-full pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <Link href="/auth/login" className="w-full">
                    <Button variant="light" className="w-full font-medium">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full">
                    <Button className="w-full font-medium">Sign Up</Button>
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
