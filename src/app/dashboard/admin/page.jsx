import React from "react";
import { getUsers } from "@/lib/api/users";
import { getStartup } from "@/lib/api/startups";
import { getAllOpportunities } from "@/lib/api/opportunities";
import { getPayments } from "@/lib/api/payments";
import AdminHomeClient from "@/components/admin/AdminHomeClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardHome() {
  // Parallel asynchronous fetching directly out of backend collection pipelines
  const [users, startups, opportunities, payments] = await Promise.all([
    getUsers().catch(() => []),
    getStartup().catch(() => []),
    getAllOpportunities().catch(() => []),
    getPayments().catch(() => []),
  ]);

  // Aggregate monetization amounts from transaction schema arrays
  const totalRevenueSum = payments.reduce(
    (acc, tx) => acc + (Number(tx.amount) || 0),
    0,
  );

  const statisticalPayload = {
    totalUsers: users.length,
    totalStartups: startups.length,
    totalOpportunities: opportunities.length,
    totalRevenue: totalRevenueSum,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 min-h-screen bg-zinc-50/40">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          Control Center
        </h1>
        <p className="text-sm text-zinc-500">
          Realtime execution logs for cloud resources and system data metrics
        </p>
      </div>

      <AdminHomeClient stats={statisticalPayload} />
    </div>
  );
}
