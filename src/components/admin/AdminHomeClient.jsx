"use client";

import React from "react";
import {
  FiUsers,
  FiLayers,
  FiBriefcase,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, Button } from "@heroui/react";

export default function AdminHomeClient({ stats }) {
  const cardsConfig = [
    {
      title: "Total Registered Users",
      value: stats.totalUsers,
      subtext: "Monitored account nodes",
      icon: <FiUsers size={22} />,
      color: "from-blue-500/10 to-indigo-500/5 text-blue-600 border-blue-100",
    },
    {
      title: "Active Startups",
      value: stats.totalStartups,
      subtext: "Registered company profiles",
      icon: <FiLayers size={22} />,
      color:
        "from-purple-500/10 to-pink-500/5 text-purple-600 border-purple-100",
    },
    {
      title: "Open Opportunities",
      value: stats.totalOpportunities,
      subtext: "Live listings in system matching",
      icon: <FiBriefcase size={22} />,
      color:
        "from-emerald-500/10 to-teal-500/5 text-emerald-600 border-emerald-100",
    },
    {
      title: "Gross Revenue Accumulated",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      subtext: "Processed payment ledger status",
      icon: <FiDollarSign size={22} />,
      color:
        "from-amber-500/10 to-orange-500/5 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dynamic Grid Layout for Master Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardsConfig.map((card, idx) => (
          <Card
            key={idx}
            className={`p-5 bg-linear-to-br ${card.color} border shadow-sm rounded-2xl flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-zinc-100">
                {card.icon}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold tracking-tight text-zinc-950">
                {card.value}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                <FiActivity size={12} /> {card.subtext}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Modern Operations Control Desk (Form Actions Block) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white border border-zinc-200/80 shadow-sm rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                <FiTrendingUp className="text-zinc-600" /> Platform Governance
                Node
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Quick diagnostic overviews and deployment status updates
              </p>
            </div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-green-50 border border-green-200 text-green-700 rounded-full uppercase tracking-wider">
              Cluster Stable
            </span>
          </div>

          <div className="h-56 w-full pt-2 -ml-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { name: "Jan", revenue: stats.totalRevenue * 0.4 },
                  { name: "Feb", revenue: stats.totalRevenue * 0.55 },
                  { name: "Mar", revenue: stats.totalRevenue * 0.62 },
                  { name: "Apr", revenue: stats.totalRevenue * 0.8 },
                  { name: "May", revenue: stats.totalRevenue * 0.95 },
                  { name: "Jun", revenue: stats.totalRevenue }, // Current gross scale
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderRadius: "12px",
                    border: "none",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff", fontSize: "12px" }}
                  labelStyle={{
                    color: "#a1a1aa",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#18181b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Administrative Quick Actions Box Layout */}
        <Card className="p-6 bg-white border border-zinc-200/80 shadow-sm rounded-2xl space-y-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-950">System Tools</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Global configuration handlers
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              size="sm"
              className="bg-zinc-950 text-white font-semibold rounded-xl w-full py-5"
            >
              Generate Platform Audit Report
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="font-semibold rounded-xl w-full py-5"
            >
              Flush Redis Buffer Cache
            </Button>
            <Button
              size="sm"
              variant="light"
              color="danger"
              className="font-bold text-xs rounded-xl w-full"
            >
              Emergency Maintenance Toggle
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
