"use client";

import React, { useState } from "react";
import {
  Bell,
  Briefcase,
  CirclePlus,
  FileText,
  House,
  LayoutSideContentLeft,
  Magnifier,
  Person,
  Pug,
  CircleDollar,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const userRole = user?.role;

  // Define separate navigation paths for Founder vs. Collaborator roles
  const roleNavItems = {
    founder: [
      { icon: House, label: "Home", href: "/dashboard/founder" },
      {
        icon: Briefcase,
        label: "My Startup",
        href: "/dashboard/founder/startups/new",
      },
      {
        icon: Magnifier,
        label: "Manage Startup",
        href: "/dashboard/founder/startups",
      },
      {
        icon: CirclePlus,
        label: "Add Opportunity",
        href: "/dashboard/founder/opportunities",
      },
      {
        icon: Bell,
        label: "Manage Opportunities",
        href: "/dashboard/founder/opportunities/manageOpportunities",
      },
      {
        icon: FileText,
        label: "Applications",
        href: "/dashboard/founder/applications",
      },
    ],
    collaborator: [
      { icon: House, label: "Browse Opportunities", href: "/allopportunities" },
      {
        icon: FileText,
        label: "My Applications",
        href: "/dashboard/collaborator/applications",
      },
      {
        icon: Person,
        label: "Profile",
        href: "/dashboard/collaborator/profile",
      },
    ],
    admin: [
      {
        icon: House,
        label: "Home",
        href: "/dashboard/admin",
      },
      {
        icon: Person,
        label: "Manage Users",
        href: "/dashboard/admin/users",
      },
      {
        icon: FileText,
        label: "Manage Startups",
        href: "/dashboard/admin/startups",
      },
      {
        icon: CircleDollar,
        label: "Transactions",
        href: "/dashboard/admin/transactions",
      },
    ],
  };

  const navItems = roleNavItems[userRole] || roleNavItems.collaborator;

  const navcontent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          onClick={() => setIsOpen(false)} // Closes mobile drawer automatically on click
        >
          <button
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
            type="button"
          >
            <item.icon className="size-5 text-zinc-400" />
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar Frame */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-zinc-200 py-6 px-4 min-h-[calc(100vh-4rem)] bg-white">
        {navcontent}
      </aside>

      {/* Mobile Trigger Button */}
      <Button
        className="lg:hidden fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 min-w-0 p-0 bg-zinc-900 text-white shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <LayoutSideContentLeft size={20} />
      </Button>

      {/* HeroUI Drawer Component implementation */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        size="xs"
      >
        <Drawer.Content className="bg-white">
          {(onClose) => (
            <>
              <Drawer.Header className="border-b border-zinc-100 font-bold text-zinc-900">
                Navigation
              </Drawer.Header>
              <Drawer.Body className="py-4">{navcontent}</Drawer.Body>
            </>
          )}
        </Drawer.Content>
      </Drawer>
    </>
  );
}
