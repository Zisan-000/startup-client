"use client";

import React, { useState, useEffect } from "react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function OpportunitiesFilter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("");
  const [industry, setIndustry] = useState("");

  // Push options up to the wrapper on change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ search, workType, industry });
    }
  }, [search, workType, industry, onFilterChange]);

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search Field (Matches Role & Skills via $regex) */}
        <div className="sm:col-span-6 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 pointer-events-none">
            <Magnifier size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles or skills..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-sm transition"
          />
        </div>

        {/* Work Type Filter (Matches via $in) */}
        <div className="sm:col-span-3 relative">
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="w-full appearance-none pl-3.5 pr-10 py-2 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-sm transition cursor-pointer"
          >
            <option value="">All Work Types</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 pointer-events-none">
            <ChevronDown size={14} />
          </span>
        </div>

        {/* Industry Filter (Matches Looked-up Startup via $in) */}
        <div className="sm:col-span-3 relative">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full appearance-none pl-3.5 pr-10 py-2 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-sm transition cursor-pointer"
          >
            <option value="">All Industries</option>
            <option value="saas">SaaS</option>
            <option value="ai">AI</option>
            <option value="fintech">Fintech</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 pointer-events-none">
            <ChevronDown size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
