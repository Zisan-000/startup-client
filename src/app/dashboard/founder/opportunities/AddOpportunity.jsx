"use client";

import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { createOpportunity } from "@/lib/actions/opportunities";
import { LuShieldAlert } from "react-icons/lu";

export default function AddOpportunity({ startup, startupStatus }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log("AddOpportunity Component - Startup Prop:", startup?.id);
  const startupId = startup?.id || "current_startup_id";

  const isApproved = startupStatus === "approved";
  const isRejected = startupStatus === "rejected";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isApproved) {
      toast.error("Unapproved profiles cannot publish positions.");
      return;
    }
    setIsSubmitting(false);

    const formData = new FormData(e.currentTarget);

    const opportunityData = {
      startup_id: startup?.id || formData.get("startupId"),
      role_title: formData.get("roleTitle"),
      required_skills: formData.get("requiredSkills"),
      work_type: formData.get("workType"),
      commitment_level: formData.get("commitmentLevel"),
      deadline: formData.get("deadline"),
    };

    setIsSubmitting(true);
    // console.log(opportunityData);
    const res = await createOpportunity(opportunityData);

    if (res?.insertedId) {
      toast.success("Opportunity posted successfully!");
      e.target.reset();
      redirect("/dashboard/founder/opportunities/manageOpportunities");
    } else {
      toast.error("Failed to post opportunity.");
    }
  };

  if (!isApproved) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center bg-zinc-50 p-4">
        <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 sm:p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto text-amber-600">
            <LuShieldAlert size={22} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-900">
              Verification Required
            </h2>

            <span className="  font-semibold">
              <p className="text-sm text-zinc-500 leading-relaxed">
                Your startup profile status is:{" "}
                <span className="text-blue-500 font-bold">{startupStatus}</span>
              </p>
            </span>
          </div>
          <p className="text-xs text-zinc-400 bg-zinc-50 border border-zinc-100 p-3 rounded-xl">
            Admin validation keeps our marketplace safe. You will be cleared to
            publish positions once review cycles close.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 py-12">
      <div className="w-full max-w-xl p-6 sm:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Add New Opportunity
          </h1>
          <p className="text-sm text-zinc-500">
            Find the perfect collaborators to scale your venture
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="hidden"
            name="startupId"
            value={startupId || "current_startup_id"}
          />

          {/* Role Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">
              Role Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="roleTitle"
              placeholder="e.g., Frontend Developer (React)"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition"
            />
          </div>

          {/* Work Type Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">
              Work Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="workType"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition"
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Commitment Level */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">
              Commitment Level <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="commitmentLevel"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Application Deadline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">
              Application Deadline <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="date"
              name="deadline"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition"
            />
          </div>

          {/* Required Skills */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              name="requiredSkills"
              rows={3}
              placeholder="e.g., React, Next.js, Tailwind CSS, MongoDB (Comma separated)"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm shadow-sm transition resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition p-2.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-sm"
            >
              {!isSubmitting && <Check size={16} />}
              {isSubmitting ? "Publishing..." : "Publish Opportunity"}
            </button>
            <button
              type="reset"
              disabled={isSubmitting}
              className="flex-1 font-medium border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 p-2.5 rounded-xl text-sm transition disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
