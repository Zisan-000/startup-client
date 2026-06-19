"use client";

import React, { useState } from "react";
import { Check, Link as LinkIcon, CommentPlus } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createApplication } from "@/lib/actions/applications";

export default function ApplyForm({ opportunity, user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Build standard payload exactly matching your database structure specifications
    const applicationPayload = {
      opportunityId: opportunity?._id?.toString() || opportunity?.id,
      applicantEmail: user?.email || formData.get("applicantEmail"),
      opportunityTitle: opportunity?.role_title,
      opportunityWorkType: opportunity?.work_type,
      portfolioLink: formData.get("portfolioLink"),
      motivationMessage: formData.get("motivationMessage"),
      status: "Pending",
    };

    try {
      const res = await createApplication(applicationPayload);

      if (res.insertedId) {
        toast.success("Application submitted successfully!");
        e.target.reset();
        router.push("/allopportunities");
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-6">
      {/* Structural Heading Banner */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Applying For Position
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 capitalize">
          {opportunity?.role_title || "Open Role"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Hidden System Input Field tracking Opportunity ID */}
        <input
          type="hidden"
          name="opportunityId"
          value={opportunity?._id?.toString() || opportunity?.id || ""}
        />

        {/* Applicant Email (Pre-filled if user is logged in, otherwise editable fallback) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">
            Applicant Email <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            name="applicantEmail"
            defaultValue={user?.email || ""}
            readOnly={!!user?.email}
            placeholder="your-email@example.com"
            className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition read-only:bg-zinc-50 read-only:text-zinc-500 read-only:cursor-not-allowed"
          />
        </div>

        {/* Portfolio Link Field input box */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">
            Portfolio Link <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 pointer-events-none">
              <LinkIcon size={16} />
            </span>
            <input
              required
              type="url"
              name="portfolioLink"
              placeholder="https://yourportfolio.com"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition"
            />
          </div>
        </div>

        {/* Motivation Message Field area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">
            Motivation Message <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <span className="absolute top-3 left-3.5 text-zinc-400 pointer-events-none">
              <CommentPlus size={16} />
            </span>
            <textarea
              required
              name="motivationMessage"
              rows={4}
              placeholder="Briefly state why you want to collaborate with this venture team..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition resize-none"
            />
          </div>
        </div>

        {/* Interactive Apply Button Actions */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition p-2.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-sm active:scale-[0.99]"
          >
            {!isSubmitting && <Check size={16} />}
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
