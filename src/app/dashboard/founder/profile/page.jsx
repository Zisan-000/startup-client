import React from "react";
import { getUserSession } from "@/lib/core/session";
import {
  FiMail,
  FiCalendar,
  FiBriefcase,
  FiZap,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Image from "next/image";

export const dynamic = "force-dynamic";

const FounderProfile = async () => {
  // 1. Collect the fresh logged-in user record directly on the server
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="flex min-h-100 items-center justify-center text-sm text-zinc-500 font-medium">
        Active user authentication session not found. Please log in.
      </div>
    );
  }

  // 2. Format variables cleanly from your database schema rules
  const signupDate = user.createdAt?.$date
    ? new Date(user.createdAt.$date).toLocaleDateString()
    : user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "Recent";

  // 3. Centralized role config adjustments for UI badges
  const roleThemes = {
    founder: {
      label: "Venture Founder",
      styles: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <FiBriefcase size={12} />,
    },
    admin: {
      label: "System Admin",
      styles: "bg-red-50 text-red-700 border-red-200",
      icon: <FiShield size={12} />,
    },
    collaborator: {
      label: "Collaborator",
      styles: "bg-green-50 text-green-700 border-green-200",
      icon: <FiUser size={12} />,
    },
  };

  const activeRole =
    roleThemes[user.role?.toLowerCase()] || roleThemes.collaborator;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-50/30 min-h-screen space-y-6">
      {/* --- CENTRAL HERO PROFILE CARD WITH BANNER IMAGE --- */}
      <div className="w-full border border-zinc-200 rounded-3xl bg-white shadow-sm overflow-hidden group">
        {/* Profile Large Cover Dropzone Image */}
        <div className="w-full h-48 bg-zinc-900 relative overflow-hidden">
          {user.image ? (
            <Image
              width={400}
              height={400}
              src={user.image}
              alt="Profile Wallpaper Cover"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-950" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Identity Details Row Blocks */}
        <div className="p-6 relative pt-0 flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-16 border-b border-zinc-100 pb-6">
          {/* Circular Thumbnail Profile Picture Avatar Asset */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-md shrink-0 relative z-10">
            {user.image ? (
              <Image
                width={400}
                height={400}
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-white font-bold uppercase tracking-widest text-xl">
                {user.name?.slice(0, 2) || "U"}
              </div>
            )}
          </div>

          {/* User Name and Realtime Dynamic Role Badge Token */}
          <div className="flex-1 text-center sm:text-left  z-10 pt-2 sm:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 capitalize">
                {user.name || "Anonymous User"}
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border self-center ${activeRole.styles}`}
              >
                {activeRole.icon}
                {activeRole.label}
              </span>
            </div>

            {/* System Status Parameter Hook Meta Info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 text-xs font-medium text-zinc-500 pt-1">
              <span className="flex items-center gap-1.5">
                <FiMail size={14} className="text-zinc-400 shrink-0" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} className="text-zinc-400 shrink-0" />
                Member since {signupDate}
              </span>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC ACTION VIEW DEPENDING UPON THE RESOLVED USER ROLE SYSTEM PARAMETERS --- */}
        <div className="p-6 bg-zinc-50/50 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Account Sub-Tier Status Card Grid Info */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <FiZap size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Active Workspace Plan
              </p>
              <p className="text-md font-bold text-zinc-900 capitalize mt-0.5">
                {user.plan || "Free"} Account Tier
              </p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <FiBriefcase size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Workspace Assignment
              </p>
              <p className="text-md font-bold text-zinc-900 mt-0.5">
                {user.role === "founder"
                  ? "Managing Team Workspace"
                  : "Ready to Collaborate"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0">
              <FiUser size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Verification Audit
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${user.emailVerified ? "text-green-600" : "text-zinc-500"}`}
              >
                {user.emailVerified
                  ? "Verified Account Node"
                  : "Awaiting Verification"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderProfile;
