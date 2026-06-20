import ManageOpportunitiesTable from "@/components/ManageOpportunitiesTable";
import { getOpportunities } from "@/lib/api/opportunities";
import { getUserSession } from "@/lib/core/session";
import React from "react";

export const dynamic = "force-dynamic";

const ManageOpportunities = async () => {
  const user = await getUserSession();
  const opportunities = (await getOpportunities(user?.id)) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen bg-white">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Manage Opportunities
        </h1>
        <p className="text-sm text-zinc-500">
          Review, update, or remove your open team requirements
        </p>
      </div>

      {opportunities.length === 0 ? (
        <div className="border border-dashed border-zinc-200 bg-white rounded-2xl p-12 text-center text-zinc-500 shadow-sm">
          No opportunities posted yet.
        </div>
      ) : (
        <ManageOpportunitiesTable initialOpportunities={opportunities} />
      )}
    </div>
  );
};

export default ManageOpportunities;
