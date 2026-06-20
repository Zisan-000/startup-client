"use client";
import React from "react";
import { Calendar, Briefcase, Clock, Code } from "@gravity-ui/icons";
import Link from "next/link";
import { Pagination } from "@heroui/react";

const OpportunitiesCard = ({
  opportunities,
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const itemsPerPage = 12;

  // Fixed the pagination ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 1) return [1];

    pages.push(1);
    if (currentPage > 3) {
      pages.push("ellipsis-1");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis-2");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  // Calculate items shown dynamically
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="max-w-7xl mx-auto space-y-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {opportunities.length === 0 ? (
        <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-16 text-center text-zinc-500 bg-white dark:bg-zinc-900 shadow-sm">
          No open opportunities available matching your filters. Check back
          later!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => {
              const id = opp._id?.toString() || opp.id;

              return (
                <div
                  key={id}
                  className="flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm shadow-cyan-500/30"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 capitalize line-clamp-1">
                        {opp.role_title}
                      </h2>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                          <Briefcase size={12} />
                          {opp.work_type}
                        </span>

                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
                          <Clock size={12} />
                          {opp.commitment_level}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-1 uppercase tracking-wider">
                        <Code size={12} /> Required Skills
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.required_skills
                          ?.split(",")
                          .slice(0, 4)
                          .map((skill, index) => (
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

                  <div className="pt-5 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-4">
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

          {/* Connected Pagination UI */}
          {totalPages > 1 && (
            <Pagination className="w-full flex flex-col items-center gap-2 pt-6">
              <Pagination.Summary className="text-sm text-zinc-500">
                Showing {startItem}-{endItem} of {totalItems} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={currentPage === 1}
                    onPress={() => onPageChange(currentPage - 1)}
                  >
                    <Pagination.PreviousIcon />
                    <span className="hidden sm:inline">Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                  String(p).includes("ellipsis") ? (
                    <Pagination.Item key={p}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === currentPage}
                        onPress={() => onPageChange(p)}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={currentPage === totalPages}
                    onPress={() => onPageChange(currentPage + 1)}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default OpportunitiesCard;
