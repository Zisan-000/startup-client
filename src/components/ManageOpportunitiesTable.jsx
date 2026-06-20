"use client";

import React, { useState } from "react";

import { FiTrash2, FiEdit3, FiCheck, FiX } from "react-icons/fi";

import { Button, AlertDialog } from "@heroui/react";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import {
  updateOpportunityInfo,
  deleteOpportunityInfo,
} from "@/lib/actions/opportunities";

export default function ManageOpportunitiesTable({ initialOpportunities }) {
  const [opportunities, setOpportunities] = useState(
    initialOpportunities || [],
  );

  const [editingId, setEditingId] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  // --- ACTIONS ---

  const handleDelete = async (id) => {
    setIsProcessing(true);

    try {
      const result = await deleteOpportunityInfo(id);

      if (result) {
        toast.success("Opportunity removed successfully.");

        setOpportunities((prev) =>
          prev.filter(
            (item) => (item._id?.toString() || item._id || item.id) !== id,
          ),
        );

        router.refresh();
      }
    } catch (err) {
      toast.error("Network communication error.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();

    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);

    const updatedPayload = {
      role_title: formData.get("role_title"),

      work_type: formData.get("work_type"),

      commitment_level: formData.get("commitment_level"),

      required_skills: formData.get("required_skills"),

      deadline: formData.get("deadline"),
    };

    try {
      const result = await updateOpportunityInfo(id, updatedPayload);

      //   console.log("Opportunity updated:", result);

      if (result) {
        toast.success("Opportunity synchronized successfully.");

        setOpportunities((prev) =>
          prev.map((item) =>
            (item._id?.toString() || item._id || item.id) === id
              ? { ...item, ...updatedPayload }
              : item,
          ),
        );

        setEditingId(null);

        router.refresh();
      }
    } catch (err) {
      toast.error("Server update failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse min-w-175">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/50">
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Role Title
            </th>

            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Work Type
            </th>

            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Commitment
            </th>

            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Required Skills
            </th>

            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Deadline
            </th>

            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-100">
          {opportunities.map((opp) => {
            const rowId = opp._id?.toString() || opp._id || opp.id;

            const isEditing = editingId === rowId;

            if (isEditing) {
              return (
                <tr key={rowId} className="bg-zinc-50/40">
                  <td className="p-4 vertical-align-top" colSpan={6}>
                    <form
                      onSubmit={(e) => handleUpdateSubmit(e, rowId)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                            Role Title
                          </label>

                          <input
                            required
                            name="role_title"
                            defaultValue={opp.role_title}
                            className="px-3 py-1.5 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 bg-white text-zinc-900"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                            Work Type
                          </label>

                          <select
                            required
                            name="work_type"
                            defaultValue={opp.work_type}
                            className="px-3 py-1.5 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 bg-white text-zinc-900"
                          >
                            <option value="Remote">Remote</option>

                            <option value="On-site">On-site</option>

                            <option value="Hybrid">Hybrid</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                            Commitment Level
                          </label>

                          <select
                            required
                            name="commitment_level"
                            defaultValue={opp.commitment_level}
                            className="px-3 py-1.5 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 bg-white text-zinc-900"
                          >
                            <option value="Full-time">Full-time</option>

                            <option value="Part-time">Part-time</option>

                            <option value="Contract">Contract</option>

                            <option value="Internship">Internship</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                        <div className="sm:col-span-2 flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                            Required Skills (Comma separated)
                          </label>

                          <input
                            required
                            name="required_skills"
                            defaultValue={opp.required_skills}
                            className="px-3 py-1.5 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 bg-white text-zinc-900"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                            Application Deadline
                          </label>

                          <input
                            required
                            type="date"
                            name="deadline"
                            defaultValue={
                              opp.deadline ? opp.deadline.split("T")[0] : ""
                            }
                            className="px-3 py-1.5 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 bg-white text-zinc-900"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-zinc-100 justify-end">
                        <Button
                          type="button"
                          size="sm"
                          variant="flat"
                          className="rounded-xl"
                          isDisabled={isProcessing}
                          onPress={() => setEditingId(null)}
                          startContent={<FiX size={14} />}
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          size="sm"
                          className="bg-zinc-950 text-white font-semibold rounded-xl"
                          isLoading={isProcessing}
                          startContent={!isProcessing && <FiCheck size={14} />}
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </td>
                </tr>
              );
            }

            return (
              <tr key={rowId} className="hover:bg-zinc-50/50 transition-colors">
                <td className="p-4">
                  <span className="font-semibold text-sm text-zinc-900 capitalize">
                    {opp.role_title}
                  </span>
                </td>

                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 uppercase">
                    {opp.work_type}
                  </span>
                </td>

                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 uppercase">
                    {opp.commitment_level}
                  </span>
                </td>

                <td className="p-4 max-w-xs">
                  <div className="flex flex-wrap gap-1 max-w-60">
                    {opp.required_skills?.split(",").map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 text-zinc-600"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4">
                  {/* CLEAN & SIMPLE DATE RENDERING WITH HYDRATION FIX */}

                  <span
                    className="text-sm text-zinc-600"
                    suppressHydrationWarning
                  >
                    {opp.deadline
                      ? new Date(opp.deadline).toLocaleDateString()
                      : "N/A"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-1.5">
                    <Button
                      isIconOnly
                      variant="light"
                      isDisabled={isProcessing}
                      onPress={() => setEditingId(rowId)}
                      className="text-zinc-500 hover:text-blue-600 rounded-xl"
                      title="Modify Open Role"
                    >
                      <FiEdit3 size={16} />
                    </Button>

                    {/* PERFECTED HEROUI ALERT DIALOG STRUCTURE */}
                    <AlertDialog>
                      <Button
                        isIconOnly
                        variant="light"
                        isDisabled={isProcessing}
                        className="text-zinc-500 hover:text-red-600 rounded-xl min-w-0 w-auto h-auto transition-all"
                        title="Purge Opportunity"
                      >
                        <FiTrash2 size={16} />
                      </Button>

                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading>
                                Remove Opportunity?
                              </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                              <p>
                                Are you sure you want to permanently remove the
                                role <strong>{opp.role_title}</strong>? This
                                action cannot be undone.
                              </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                              <Button slot="close" variant="tertiary">
                                Cancel
                              </Button>
                              <Button
                                slot="close"
                                variant="danger"
                                onPress={() => handleDelete(rowId)}
                              >
                                Confirm Delete
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
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
