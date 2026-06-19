import {
  Bell,
  Briefcase,
  CirclePlus,
  FileText,
  House,
  LayoutSideContentLeft,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    {
      icon: House,
      label: "Home",
      href: "/dashboard/founder",
    },
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
  ];

  const navcontent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link href={item.href} key={item.label}>
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 border-r border-divider py-4">
        {navcontent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navcontent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
