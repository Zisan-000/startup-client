"use client";

import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import {
  FiTrash2,
  FiEdit3,
  FiActivity,
  FiMail,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { HiOutlineBuildingOffice, HiOutlineTag } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Textarea, AlertDialog, TextArea } from "@heroui/react"; // Fixed TextArea to Textarea
import { deleteStartupInfo, updateStartupInfo } from "@/lib/actions/startups";
import Image from "next/image";

export default function ManageStartupsTable({ initialStartups }) {
  const startup = initialStartups?.[0] || null;

  const [activeStartup, setActiveStartup] = useState(startup);
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  if (!activeStartup) {
    return (
      <div className="border border-dashed border-zinc-200 bg-white rounded-2xl p-12 text-center text-zinc-500 shadow-sm">
        No startup workspace linked to this account yet.
      </div>
    );
  }

  const id = activeStartup.startupId || activeStartup._id?.toString();

  // --- DELETE ACTION (HEROUI DIALOG) ---
  const executeDeleteAction = async () => {
    setIsProcessing(true);

    try {
      // Call the clean server mutation helper
      const result = await deleteStartupInfo(id);

      if (result?.deletedCount || result?.acknowledged) {
        toast.success("Startup permanently removed.");
        setActiveStartup(null);
        router.refresh();
      } else {
        toast.error("Failed to delete venture profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication error.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- UPDATE ACTION ---
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);
    const updatedPayload = {
      name: formData.get("name"),
      description: formData.get("description"),
      industry: formData.get("industry"),
      fundingStage: formData.get("fundingStage"),
    };

    try {
      const result = await updateStartupInfo(id, updatedPayload);

      if (result) {
        toast.success("Startup metadata synchronized.");
        setActiveStartup((prev) => ({ ...prev, ...updatedPayload }));
        setIsEditing(false); // Drop back out to view mode smoothly
        router.refresh();
      } else {
        toast.error("Failed to process updates.");
      }
    } catch (err) {
      toast.error("Server connection timeout.");
    } finally {
      setIsProcessing(false);
    }
  };

  const statusStyles = {
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 space-y-6">
      {/* --- FORM STATE MODE --- */}
      {isEditing ? (
        <form onSubmit={handleUpdateSubmit} className="space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">
                Modify Profile
              </h2>
              <p className="text-xs text-zinc-400">
                Update your startup workspace metadata
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                className="bg-zinc-950 text-white font-semibold rounded-xl"
                isLoading={isProcessing}
                startContent={!isProcessing && <FiCheck size={14} />}
              >
                Update
              </Button>
              <Button
                type="button"
                size="sm"
                variant="flat"
                className="rounded-xl"
                isDisabled={isProcessing}
                onPress={() => setIsEditing(false)}
                startContent={<FiX size={14} />}
              >
                Cancel
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-600">
                Startup Name
              </label>
              <input
                required
                name="name"
                defaultValue={activeStartup.name || activeStartup.startup_name}
                className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-950 transition bg-white text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-600">
                  Industry
                </label>
                <input
                  required
                  name="industry"
                  defaultValue={activeStartup.industry}
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-950 transition bg-white text-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-600">
                  Funding Round
                </label>
                <input
                  required
                  name="fundingStage"
                  defaultValue={
                    activeStartup.fundingStage || activeStartup.funding_stage
                  }
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-zinc-950 transition bg-white text-zinc-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-600">
                Venture Pitch Summary
              </label>
              <TextArea
                required
                name="description"
                defaultValue={activeStartup.description}
                minRows={3}
                className="w-full"
                classNames={{
                  inputWrapper:
                    "border-zinc-300 hover:border-zinc-400 focus-within:!border-zinc-950 p-3",
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        /* --- READ ONLY VIEW MODE --- */
        <>
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center overflow-hidden p-1 shrink-0 relative">
                {activeStartup.logo ? (
                  <Image
                    fill
                    sizes="40px"
                    src={activeStartup.logo}
                    alt="Logo"
                    className="object-contain p-0.5"
                  />
                ) : (
                  <HiOutlineBuildingOffice
                    size={20}
                    className="text-zinc-400"
                  />
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-zinc-900 capitalize">
                  {activeStartup.name || activeStartup.startup_name}
                </h2>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider border border-zinc-200 uppercase mt-1 ${
                    statusStyles[activeStartup.status] ||
                    "bg-zinc-50 text-zinc-600"
                  }`}
                >
                  {activeStartup.status || "pending"}
                </span>
              </div>
            </div>

            {/* View Actions Trigger Group */}
            {activeStartup.status === "approved" && (
              <div className="flex items-center gap-1.5">
                <Button
                  isIconOnly
                  variant="light"
                  isDisabled={isProcessing}
                  onPress={() => setIsEditing(true)}
                  className="text-zinc-500 hover:text-blue-600 rounded-xl"
                  title="Edit Profile Data"
                >
                  <FiEdit3 size={16} />
                </Button>

                <AlertDialog>
                  {/* Trigger Button */}
                  <Button
                    isIconOnly
                    variant="light"
                    isDisabled={isProcessing}
                    title="Delete Startup Profile"
                    className="text-zinc-500 hover:text-red-600 rounded-xl transition-all"
                  >
                    <FiTrash2 size={16} />
                  </Button>

                  {/* Dialog Content */}
                  <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                      <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                          <AlertDialog.Icon status="danger" />
                          <AlertDialog.Heading>
                            Delete Startup Profile?
                          </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                          <p>
                            Are you completely sure you want to permanently
                            delete{" "}
                            <strong>
                              {activeStartup.name || activeStartup.startup_name}
                            </strong>
                            ? This action cannot be undone and will erase your
                            workspace.
                          </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                          <Button slot="close" variant="tertiary">
                            Cancel
                          </Button>
                          <Button
                            slot="close"
                            variant="danger"
                            onPress={executeDeleteAction}
                            isLoading={isProcessing}
                          >
                            Confirm Delete
                          </Button>
                        </AlertDialog.Footer>
                      </AlertDialog.Dialog>
                    </AlertDialog.Container>
                  </AlertDialog.Backdrop>
                </AlertDialog>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="text-sm text-zinc-600 bg-zinc-50 p-4 rounded-xl border border-zinc-100/80 leading-relaxed">
              <p className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider mb-1">
                Vision Summary
              </p>
              {activeStartup.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
                <HiOutlineTag size={16} className="text-zinc-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Industry
                  </p>
                  <p className="font-semibold text-zinc-800 text-xs uppercase">
                    {activeStartup.industry || "General"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
                <FiActivity size={16} className="text-zinc-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Funding Stage
                  </p>
                  <p className="font-semibold text-zinc-800 text-xs capitalize">
                    {activeStartup.fundingStage ||
                      activeStartup.funding_stage ||
                      "Idea"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
              <FiMail size={16} className="text-zinc-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Founder Operations Address
                </p>
                <p className="font-semibold text-zinc-800 text-xs">
                  {activeStartup.founderEmail}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
