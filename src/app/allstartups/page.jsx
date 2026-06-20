import React from "react";
import { getStartup } from "@/lib/api/startups";
import AllStartupsGrid from "@/components/AllStartupsGrid";

export const dynamic = "force-dynamic";

const AllStartupsPage = async () => {
  const startups = (await getStartup()) || [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 min-h-screen bg-zinc-50/40">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          Venture Ecosystem
        </h1>
        <p className="text-sm text-zinc-500">
          Discover active organizations running live listings:{" "}
          <span className="font-semibold text-zinc-800">{startups.length}</span>
        </p>
      </div>

      {/* Load Searchable Presentation Shell Component Grid */}
      <AllStartupsGrid initialStartups={startups} />
    </div>
  );
};

export default AllStartupsPage;
