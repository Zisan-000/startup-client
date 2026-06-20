import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import {
  Calendar,
  House,
  Briefcase,
  Link as LinkIcon,
  InfoCircle,
} from "@gravity-ui/icons";

const MyApplications = async () => {
  const user = await getUserSession();
  const applications = (await getApplicationsByApplicant(user?.email)) || [];
  // console.log("Applications loaded on server:", applications);

  // Helper mapping to style status badges cleanly
  const statusStyles = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Metadata Section */}
        <div className="flex flex-col gap-1 pb-4 border-b border-zinc-200">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            My Applications
          </h1>
          <p className="text-sm text-zinc-500">
            Track your submission status and collaboration requests across
            ventures.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="border border-dashed border-zinc-200 rounded-2xl p-16 text-center text-zinc-500 bg-white shadow-sm">
            You have not submitted any venture applications yet.
          </div>
        ) : (
          /* Responsive Table Frame Container */
          <div className="w-full overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-187.5">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/70">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Opportunity
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Company / Startup
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Applied Date
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Status
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Links
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100">
                {applications.map((app) => {
                  const appId = app._id?.toString() || app.id;

                  // Handle flexible date format coming out of database fields securely
                  const rawDate = app.applied_at?.["$date"] || app.applied_at;
                  const formattedDate = rawDate
                    ? new Date(rawDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recent";

                  return (
                    <tr
                      key={appId}
                      className="hover:bg-zinc-50/40 transition-colors"
                    >
                      {/* Opportunity Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-zinc-400">
                            <Briefcase size={16} />
                          </span>
                          <span className="font-semibold text-sm text-zinc-900 capitalize">
                            {app.opportunityTitle || "Open Role"}
                          </span>
                        </div>
                      </td>

                      {/* Startup Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-2.5 text-zinc-600">
                          <span className="text-zinc-400">
                            <House size={16} />
                          </span>
                          <span className="text-sm font-medium text-zinc-800">
                            {app.startupName}
                          </span>
                        </div>
                      </td>

                      {/* Applied Date */}
                      <td className="p-4 text-sm text-zinc-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-zinc-400" />
                          <span>{formattedDate}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[app.status] || "bg-zinc-50 text-zinc-600 border-zinc-200"}`}
                        >
                          {app.status || "Pending"}
                        </span>
                      </td>

                      {/* External Portfolio Links */}
                      <td className="p-4">
                        {app.portfolioLink ? (
                          <a
                            href={app.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 underline transition"
                          >
                            <LinkIcon size={12} /> Portfolio
                          </a>
                        ) : (
                          <span className="text-xs text-zinc-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
