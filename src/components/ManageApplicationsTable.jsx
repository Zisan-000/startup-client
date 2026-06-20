"use client";

import React, { useState } from "react";
import { FiCheck, FiX, FiMail, FiLink, FiClock } from "react-icons/fi";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/lib/actions/applications";

export default function ManageApplicationsTable({ initialApplications }) {
  const [applications, setApplications] = useState(initialApplications || []);
  const [actionId, setActionId] = useState(null);
  const router = useRouter();

  // --- ACTIONS ---
  const handleStatusUpdate = async (id, newStatus) => {
    setActionId(id);
    try {
      const result = await updateApplicationStatus(id, { status: newStatus });

      if (result) {
        toast.success(`Application status updated to ${newStatus}.`);
        setApplications((prev) =>
          prev.map((item) =>
            (item._id?.toString() || item._id || item.id) === id
              ? { ...item, status: newStatus }
              : item,
          ),
        );
        router.refresh();
      }
    } catch (err) {
      toast.error("Failed to update application status.");
    } finally {
      setActionId(null);
    }
  };

  const statusStyles = {
    Accepted: "bg-green-50 text-green-700 border-green-200",
    Reject: "bg-red-50 text-red-700 border-red-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse min-w-200">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/50">
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Applicant
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Target Role
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Portfolio
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Motivation Message
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Status
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-100">
          {applications.map((app) => {
            // FIXED ID TRACKING: Target the application primary key token directly
            const rowId = app._id?.toString() || app._id || app.id;
            const isProcessing = actionId === rowId;

            return (
              <tr key={rowId} className="hover:bg-zinc-50/50 transition-colors">
                {/* Applicant Identity info */}
                <td className="p-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                      <FiMail className="text-zinc-400 " size={14} />
                      {app.applicantEmail}
                    </span>
                    <span
                      className="flex items-center gap-1 text-[11px] text-zinc-400"
                      suppressHydrationWarning
                    >
                      <FiClock size={11} />
                      {app.applied_at?.$date
                        ? new Date(app.applied_at.$date).toLocaleDateString()
                        : app.applied_at
                          ? new Date(app.applied_at).toLocaleDateString()
                          : "Recent"}
                    </span>
                  </div>
                </td>

                {/* Target Role & Type */}
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-zinc-900">
                      {app.opportunityTitle}
                    </span>
                    <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider mt-0.5">
                      {app.opportunityWorkType || "Job Profile"}
                    </span>
                  </div>
                </td>

                {/* Portfolio URL Hook */}
                <td className="p-4">
                  {app.portfolioLink ? (
                    <a
                      href={app.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-blue-600 hover:underline bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-200/60 transition-all"
                    >
                      <FiLink size={12} />
                      View Portfolio
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-400">None Provided</span>
                  )}
                </td>

                {/* Motivation Letter Field */}
                <td className="p-4 max-w-xs">
                  <p
                    className="text-sm text-zinc-600 line-clamp-2"
                    title={app.motivationMessage}
                  >
                    {app.motivationMessage || "No pitch provided."}
                  </p>
                </td>

                {/* Processing State Status Badge */}
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase border ${statusStyles[app.status] || "bg-zinc-50 text-zinc-600 border-zinc-200"}`}
                  >
                    {app.status}
                  </span>
                </td>

                {/* State Modification Control Inline Handlers */}
                <td className="p-4">
                  {app.status === "Pending" ? (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        className="bg-zinc-950 text-white font-semibold rounded-xl min-w-20"
                        isLoading={isProcessing}
                        onPress={() => handleStatusUpdate(rowId, "Accepted")}
                        startContent={!isProcessing && <FiCheck size={14} />}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="text-red-600 hover:bg-red-50 font-semibold rounded-xl min-w-20"
                        isLoading={isProcessing}
                        onPress={() => handleStatusUpdate(rowId, "Rejected")}
                        startContent={!isProcessing && <FiX size={14} />}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-xs text-zinc-400 font-medium italic">
                      Decision Handled
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
