import ManageStartupsTable from "@/components/ManageStartupsTable";
import { getStartups } from "@/lib/api/startups";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export const dynamic = "force-dynamic";

const StartupProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const startups = (await getStartups(user?.id)) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen bg-white">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Your Startup
        </h1>
        <p className="text-sm text-zinc-500">
          Manage and review registered workspace ventures
        </p>
      </div>

      {startups.length === 0 ? (
        <div className="border border-dashed border-zinc-200 bg-white rounded-2xl p-12 text-center text-zinc-500 shadow-sm">
          No startups found for this account.
        </div>
      ) : (
        <ManageStartupsTable initialStartups={startups} />
      )}
    </div>
  );
};

export default StartupProfile;
