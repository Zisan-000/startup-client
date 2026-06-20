"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import { FaBriefcase, FaFileInvoice, FaUserCheck } from "react-icons/fa";

export default function FounderPageClient({ stats, userName }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const statsConfig = [
    {
      title: "Total Opportunities",
      value: stats.totalOpportunities,
      description: "Active slots across all startups",
      icon: <FaBriefcase className="text-blue-500" size={20} />,
      accentColor: "bg-blue-500/10 border-blue-200 dark:border-blue-800/30",
    },
    {
      title: "Total Applications",
      value: stats.totalApplications,
      description: "Submitted candidate profiles",
      icon: <FaFileInvoice className="text-amber-500" size={20} />,
      accentColor: "bg-amber-500/10 border-amber-200 dark:border-amber-800/30",
    },
    {
      title: "Accepted Members",
      value: stats.acceptedMembers,
      description: "Successfully onboarded team nodes",
      icon: <FaUserCheck className="text-emerald-500" size={20} />,
      accentColor:
        "bg-emerald-500/10 border-emerald-200 dark:border-emerald-800/30",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 min-h-screen bg-zinc-50/40 dark:bg-zinc-950">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 capitalize">
          Welcome Back, {userName}!
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Here is an operational snapshot of your startup metrics today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsConfig.map((stat, index) => (
          <Card
            key={index}
            className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-xs p-6 flex flex-row items-center justify-between gap-4 rounded-2xl"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                {stat.title}
              </span>
              <h3 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                {stat.value}
              </h3>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 pt-0.5">
                {stat.description}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${stat.accentColor}`}
            >
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
