"use client";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@heroui/react";
import React from "react";
import { FaBriefcase, FaFileInvoice, FaUserCheck } from "react-icons/fa";

const FounderPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const stats = [
    {
      title: "Total Opportunities",
      value: "42",
      description: "Active postings available",
      icon: <FaBriefcase className="text-blue-500" size={22} />,
      accentColor: "bg-blue-500/10 border-blue-200 dark:border-blue-800/30",
    },
    {
      title: "Total Applications",
      value: "186",
      description: "+12% increase this week",
      icon: <FaFileInvoice className="text-warning" size={22} />,
      accentColor: "bg-amber-500/10 border-amber-200 dark:border-amber-800/30",
    },
    {
      title: "Accepted Members",
      value: "64",
      description: "Successfully onboarded",
      icon: <FaUserCheck className="text-success" size={22} />,
      accentColor:
        "bg-emerald-500/10 border-emerald-200 dark:border-emerald-800/30",
    },
  ];
  return (
    <div>
      <h1 className="m-5 text-4xl text-center font-bold text-zinc-900 dark:text-zinc-50">
        Welcome Back, {user?.name || user?.email}!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto p-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl"
          >
            <CardContent className="p-6 flex flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block">
                  {stat.title}
                </span>
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {stat.value}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 pt-1">
                  {stat.description}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl border flex items-center justify-center ${stat.accentColor}`}
              >
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FounderPage;
