import React from "react";
import { getStartup } from "@/lib/api/startups";
import AdminStartupsTable from "@/components/admin/AdminStartupsTable";
import { FaDotCircle } from "react-icons/fa";

export const dynamic = "force-dynamic";

const AdminStartupPage = async () => {
  const startups = (await getStartup()) || [];

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Dynamic Descriptive Top Bar Header info */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Venture Verification System
            </h1>
            <p className="text-sm text-zinc-500">
              Approve pending creator platforms or purge incomplete ecosystem
              nodes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl">
            <FaDotCircle size={16} className="text-zinc-400" />
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Total Indexed:
            </span>
            <span className="text-sm font-black text-zinc-900">
              {startups.length}
            </span>
          </div>
        </div>

        {/* Data Layer Layout Execution Container */}
        {startups.length === 0 ? (
          <div className="border border-dashed border-zinc-200 rounded-2xl p-16 text-center text-zinc-500 bg-white shadow-sm">
            No startups are currently registered in the indexing nodes database.
          </div>
        ) : (
          <AdminStartupsTable initialStartups={startups} />
        )}
      </div>
    </div>
  );
};

export default AdminStartupPage;
