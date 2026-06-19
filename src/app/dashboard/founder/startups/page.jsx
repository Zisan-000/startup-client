import { getStartups } from "@/lib/api/startups";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { TrashBin, Pencil } from "@gravity-ui/icons";
import { BiUser } from "react-icons/bi";
import Image from "next/image";

const StartupProfile = async () => {
  // 1. Fetch user session on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // 2. Fetch data from your database helper
  const startups = (await getStartups(user?.id)) || [];
  // console.log("Startups loaded on server:", startups);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          All Startups
        </h1>
        <p className="text-sm text-zinc-500">
          Manage and review registered workspace ventures
        </p>
      </div>

      {startups.length === 0 ? (
        <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
          No startups found for this account.
        </div>
      ) : (
        /* Normal Semantic HTML Table Implementation */
        <div className="w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Startup
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Industry
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Stage
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Description
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Status
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {startups.map((startup) => {
                const rowId = startup._id?.toString() || startup.id;

                return (
                  <tr
                    key={rowId}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    {/* Startup Identity */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex items-center justify-center shrink-0">
                          {startup.logo ? (
                            <Image
                              alt={startup.name}
                              width={40}
                              height={40}
                              src={startup.logo}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <BiUser size={20} className="text-zinc-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 capitalize">
                            {startup.name}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {startup.founderEmail}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 uppercase">
                        {startup.industry}
                      </span>
                    </td>

                    {/* Funding Stage */}
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 uppercase">
                        {startup.funding_stage}
                      </span>
                    </td>

                    {/* Description Text */}
                    <td className="p-4 max-w-xs">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                        {startup.description}
                      </p>
                    </td>

                    {/* Status Indicator */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                          startup.status === "approved"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : startup.status === "rejected"
                              ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                              : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                        }`}
                      >
                        {startup.status}
                      </span>
                    </td>

                    {/* CRUD Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
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

export default StartupProfile;
