import React from "react";
import { Calendar, Briefcase, Clock, Code } from "@gravity-ui/icons";
import Link from "next/link";

const OpportunitiesCard = ({ opportunities }) => {
  return (
    <div className="max-w-7xl mx-auto  space-y-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {opportunities.length === 0 ? (
        <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-16 text-center text-zinc-500 bg-white dark:bg-zinc-900 shadow-sm">
          No open opportunities available at the moment. Check back later!
        </div>
      ) : (
        /* Dynamic 3-Column Responsive Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => {
            const id = opp._id?.toString() || opp.id;

            return (
              <div
                key={id}
                className="flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200  shadow-sm shadow-cyan-500/30"
              >
                {/* Card Main Info Body */}
                <div className="space-y-4">
                  {/* Title & Accent Badges */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 capitalize line-clamp-1">
                      {opp.role_title}
                    </h2>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {/* Work Type Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                        <Briefcase size={12} />
                        {opp.work_type}
                      </span>

                      {/* Commitment Level Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
                        <Clock size={12} />
                        {opp.commitment_level}
                      </span>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-1 uppercase tracking-wider">
                      <Code size={12} /> Required Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.required_skills?.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 px-2.5 py-1 rounded-xl text-zinc-600 dark:text-zinc-300 font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions Area */}
                <div className="pt-5 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-4">
                  {/* Deadline Indicators */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={11} /> Deadline
                    </span>
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {opp.deadline
                        ? new Date(opp.deadline).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Open"}
                    </span>
                  </div>

                  {/* Submit Trigger Action */}
                  <Link href={`/allopportunities/${id}`}>
                    <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm transition active:scale-[0.98]">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OpportunitiesCard;
