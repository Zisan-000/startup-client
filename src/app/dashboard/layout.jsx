import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar user={user} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
