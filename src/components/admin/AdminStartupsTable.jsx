"use client";

import React, { useState } from "react";
import { Check, TrashBin, House, Envelope } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import Image from "next/image";
import { updateStartup } from "@/lib/actions/startups";
import { useRouter } from "next/navigation";

export default function AdminStartupsTable({ initialStartups }) {
  const [startups, setStartups] = useState(initialStartups || []);
  const [actionId, setActionId] = useState(null);
  const router = useRouter();

  // 1. Action Handler: Update Startup Status to Approved
  const handleApprove = async (id) => {
    setActionId(id);
    try {
      const result = await updateStartup(id, { status: "approved" });

      if (result.modifiedCount) {
        toast.success("Startup approved successfully!");
        window.location.reload();
        // console.log("Startup approved successfully!");
      } else {
        toast.error("Failed to approve startup.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication error.");
    } finally {
      setActionId(null);
    }
  };

  // 2. Action Handler: Remove Startup Document completely
  const handleRemove = async (id) => {
    if (!confirm("Are you completely sure you want to remove this venture?"))
      return;
    setActionId(id);
    try {
      const result = await updateStartup(id, { status: "rejected" });
      if (result.modifiedCount) {
        toast.success("Startup rejected.");
        window.location.reload();
        // Filter out item instantly from current display matrix
      } else {
        toast.error("Failed to delete record.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication error.");
    } finally {
      setActionId(null);
    }
  };

  const statusBadges = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse min-w-200">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/70">
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Startup Details
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Industry
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Funding Stage
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Founder Contacts
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Verification Status
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {startups.map((startup) => {
            const startupId = startup._id?.$oid || startup._id;
            const isLoading = actionId === startupId;

            return (
              <tr
                key={startupId}
                className="hover:bg-zinc-50/40 transition-colors"
              >
                {/* Name & Logo Metadata Box */}
                <td className="p-4 max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 shrink-0 overflow-hidden flex items-center justify-center p-1">
                      {startup.logo ? (
                        <Image
                          width={300}
                          height={300}
                          src={startup.logo}
                          alt="logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <House size={18} className="text-zinc-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-zinc-900 capitalize">
                        {startup.name}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {startup.description}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Industry Sector */}
                <td className="p-4">
                  <span className="text-xs font-bold uppercase tracking-wider bg-zinc-100 px-2 py-0.5 border border-zinc-200 text-zinc-600 rounded-md">
                    {startup.industry || "General"}
                  </span>
                </td>

                {/* Funding Round Stage */}
                <td className="p-4 text-sm font-medium text-zinc-700 capitalize">
                  {startup.fundingStage || "Idea"}
                </td>

                {/* Founder Mail */}
                <td className="p-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Envelope size={14} className="text-zinc-400" />
                    <span className="text-xs">
                      {startup.founderEmail || startup.founder_email}
                    </span>
                  </div>
                </td>

                {/* Verification Status Badge info */}
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusBadges[startup.status] || "bg-zinc-50 text-zinc-600"}`}
                  >
                    {startup.status || "pending"}
                  </span>
                </td>

                {/* Interactive Action Command Group */}
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1.5">
                    {startup.status !== "approved" && (
                      <div>
                        <button
                          onClick={() => handleApprove(startupId)}
                          disabled={isLoading}
                          title="Approve Startup"
                          className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 disabled:opacity-40 transition-all"
                        >
                          <Check size={16} className="stroke-[2.5]" />
                        </button>
                      </div>
                    )}
                    {startup.status !== "rejected" && (
                      <button
                        onClick={() => handleRemove(startupId)}
                        disabled={isLoading}
                        title="Remove Startup"
                        className="p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 disabled:opacity-40 transition-all"
                      >
                        <TrashBin size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
