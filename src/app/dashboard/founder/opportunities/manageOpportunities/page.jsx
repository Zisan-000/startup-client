import { getOpportunities } from "@/lib/api/opportunities";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import { TrashBin, Pencil } from "@gravity-ui/icons";

const ManageOpportunities = async () => {
  const user = await getUserSession();
  console.log(user);
  // Fetching opportunity items from backend
  const opportunities = (await getOpportunities(user?.id)) || [];
  console.log("Opportunities loaded on server:", opportunities);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Manage Opportunities
        </h1>
        <p className="text-sm text-zinc-500">
          Review, update, or remove your open team requirements
        </p>
      </div>

      {opportunities.length === 0 ? (
        <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
          No opportunities posted yet.
        </div>
      ) : (
        /* Native Semantic Responsive Table Framework */
        <div className="w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
          <table className="w-full text-left border-collapse min-w-175">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Role Title
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Work Type
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Commitment
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Required Skills
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Deadline
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {opportunities.map((opp) => {
                const rowId = opp._id?.toString() || opp.id;

                return (
                  <tr
                    key={rowId}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    {/* Role Title */}
                    <td className="p-4">
                      <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 capitalize">
                        {opp.role_title}
                      </span>
                    </td>

                    {/* Work Type */}
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 uppercase">
                        {opp.work_type}
                      </span>
                    </td>

                    {/* Commitment Level */}
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 uppercase">
                        {opp.commitment_level}
                      </span>
                    </td>

                    {/* Required Skills */}
                    <td className="p-4 max-w-xs">
                      <div className="flex flex-wrap gap-1 max-w-60">
                        {opp.required_skills?.split(",").map((skill, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="p-4">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {opp.deadline
                          ? new Date(opp.deadline).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </td>

                    {/* Modification Buttons (Update / Delete) */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 rounded-lg text-zinc-500 hover:text-blue-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all">
                          <Pencil size={16} />
                        </button>
                        <button className="p-2 rounded-lg text-zinc-500 hover:text-red-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
                          <TrashBin size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOpportunities;
