"use client";

import React, { useState } from "react";
import {
  FiLayers,
  FiMail,
  FiCompass,
  FiSearch,
  FiDollarSign,
} from "react-icons/fi";
import { Card, Chip, Input } from "@heroui/react"; // Re-verified your library targets
import Image from "next/image";

export default function AllStartupsGrid({ initialStartups }) {
  const [searchQuery, setSearchQuery] = useState("");

  const statusColors = {
    approved: "success",
    pending: "warning",
    rejected: "danger",
  };

  // Filter listings based on user search parameters
  const filteredStartups = initialStartups.filter((startup) => {
    const name = startup.name || startup.startup_name || "";
    const industry = startup.industry || "";
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Filter Strip Container */}
      <div className="max-w-md w-full">
        <div className="relative flex items-center group">
          {/* Clean Native Input */}
          <input
            type="text"
            placeholder="Search startups by name or industry sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-4 pr-12 bg-white border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 focus:outline-hidden rounded-xl text-sm font-medium text-zinc-800 placeholder:text-zinc-400 shadow-xs transition-all duration-200"
          />

          {/* Sleek, Modern Trailing Interactive Icon Area */}
          <div className="absolute right-3 p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-500 group-focus-within:bg-zinc-950 group-focus-within:text-white group-focus-within:border-zinc-950 transition-all duration-200 pointer-events-none">
            <FiSearch size={14} />
          </div>
        </div>
      </div>

      {/* Dynamic Render Grid */}
      {filteredStartups.length === 0 ? (
        <div className="border border-dashed border-zinc-200 bg-white rounded-3xl p-12 text-center text-zinc-400 text-sm font-medium">
          No matching startups located in current cluster matrix.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => {
            const rowId =
              startup._id?.toString() || startup.startupId || startup.id;

            // SCHEMA COMPATIBILITY NORMALIZATION
            const name =
              startup.name || startup.startup_name || "Untitled Startup";
            const email =
              startup.founderEmail || startup.founder_email || "N/A";
            const funding =
              startup.fundingStage || startup.funding_stage || "Idea";
            const currentStatus = startup.status || "pending";

            return (
              <Card
                key={rowId}
                className="p-5 bg-white border border-zinc-200/80 hover:border-zinc-300 shadow-xs hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Branding Top Header row */}
                  <div className="flex items-start justify-between gap-4">
                    {/* FIXED: Handled Next.js Image wrapper container boundaries safely */}
                    <div className="w-12 h-12 rounded-2xl border border-zinc-100 bg-zinc-50 overflow-hidden shrink-0 flex items-center justify-center relative">
                      {startup.logo ? (
                        <Image
                          fill
                          sizes="48px"
                          alt={`${name} logo`}
                          src={startup.logo}
                          className="object-cover"
                        />
                      ) : (
                        <FiLayers size={20} className="text-zinc-400" />
                      )}
                    </div>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        statusColors[currentStatus.toLowerCase()] || "default"
                      }
                      className="capitalize font-bold text-[10px] tracking-wider shrink-0"
                    >
                      {currentStatus}
                    </Chip>
                  </div>

                  {/* Description Title Context blocks */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-zinc-950 group-hover:text-blue-600 transition-colors capitalize truncate">
                      {name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-200/50 text-[10px] font-bold text-zinc-600 uppercase tracking-wider rounded-md">
                        {startup.industry || "General"}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-xs text-zinc-400 font-medium capitalize">
                        <FiDollarSign size={12} /> {funding}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 pt-1">
                      {startup.description ||
                        "No corporate blueprint pitch overview provided."}
                    </p>
                  </div>
                </div>

                {/* Footer Core Contact Block */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-medium">
                  <span
                    className="flex items-center gap-1.5 truncate max-w-[75%]"
                    title={email}
                  >
                    <FiMail className="shrink-0 text-zinc-400" size={13} />
                    {email}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold uppercase tracking-wider group-hover:underline cursor-pointer shrink-0">
                    Explore <FiCompass size={11} />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
