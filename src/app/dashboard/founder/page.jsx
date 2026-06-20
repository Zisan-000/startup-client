import React from "react";
import { getUserSession } from "@/lib/core/session";
import { getStartups } from "@/lib/api/startups";
import { getApplicationsByFounder } from "@/lib/api/applications";
import FounderPageClient from "@/components/FounderPageClient";
import { getOpportunities } from "@/lib/api/opportunities";

export const dynamic = "force-dynamic";

export default async function FounderDashboardPage() {
  const user = await getUserSession();

  // 1. Fetch backend arrays concurrently
  const [opportunities, applications] = await Promise.all([
    user?.id ? getOpportunities(user.id).catch(() => []) : [],
    user?.email ? getApplicationsByFounder(user.email).catch(() => []) : [],
  ]);
  // console.log("FounderDashboardPage startups:", opportunities);
  // console.log("FounderDashboardPage applications:", applications);
  const totalOpportunitiesCount = opportunities.length;

  const totalApplicationsCount = applications.length;

  const acceptedCount = applications.filter(
    (app) =>
      app.status?.toLowerCase() === "accepted" || app.payment_status === "paid",
  ).length;

  const dynamicStats = {
    totalOpportunities: totalOpportunitiesCount,
    totalApplications: totalApplicationsCount,
    acceptedMembers: acceptedCount,
  };

  const fallbackName = user?.email ? user.email.split("@")[0] : "User";
  const greetingName = user?.name || fallbackName;

  return <FounderPageClient stats={dynamicStats} userName={greetingName} />;
}
