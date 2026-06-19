import { getOpportunitiesById } from "@/lib/api/opportunities";
import React from "react";
import {
  Calendar,
  Briefcase,
  Clock,
  Code,
  ChevronLeft,
  Globe,
  Factory,
} from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

const OpportunitiesDetails = async ({ params }) => {
  const { id } = await params;
  const opp = await getOpportunitiesById(id);

  // console.log("Opportunity Details fetched:", id, opp);

  if (!opp) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
        <div className="text-center space-y-4">
          <p className="text-zinc-500 dark:text-zinc-400">
            Opportunity record could not be found.
          </p>
          <Link
            href="/allopportunities"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-50 underline"
          >
            Back to browse listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <Link
          href="/allopportunities"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
        >
          <ChevronLeft size={16} /> Back to Open Opportunities
        </Link>

        {/* Main Details Structural Card */}
        <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 sm:p-8 space-y-8">
          {/* Header Block Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 capitalize">
                {opp.role_title}
              </h1>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                  <Briefcase size={12} /> {opp.work_type}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
                  <Clock size={12} /> {opp.commitment_level}
                </span>
              </div>
            </div>
            <Link href={`/allopportunities/${id}/apply`}>
              <button className="w-full sm:w-auto px-6 py-3 font-semibold rounded-xl bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90 shadow-sm transition active:scale-[0.98]">
                Apply for this Role
              </button>
            </Link>
          </div>

          {/* Grid Splitting Component Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core Role Info Body Column (Left 2/3) */}
            <div className="md:col-span-2 space-y-6">
              {/* Skills Requirement Block */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <Code size={14} /> Required Stack / Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opp.required_skills?.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 px-3 py-1 rounded-xl text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Extended Meta Timeline Block */}
              <div className="pt-2 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <Calendar size={14} /> Key Timelines
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Applications close strictly on{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    {opp.deadline
                      ? new Date(opp.deadline).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Open Registration"}
                  </strong>
                  .
                </p>
              </div>
            </div>

            {/* Parent Startup Profile Section Card Column (Right 1/3) */}
            {opp.startup_info && (
              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl space-y-4 h-fit">
                <div className="flex items-center gap-3">
                  {opp.startup_info.logo ? (
                    <Image
                      width={400}
                      height={400}
                      src={opp.startup_info.logo}
                      alt={opp.startup_info.startup_name || "Startup Logo"}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800 bg-white"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <Factory size={20} />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">
                      {opp.startup_info.startup_name || opp.startup_info.name}
                    </h4>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      {opp.startup_info.industry}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-4">
                  {opp.startup_info.description}
                </p>

                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Funding:</span>
                    <span className="font-semibold capitalize text-zinc-800 dark:text-zinc-200">
                      {opp.startup_info.funding_stage ||
                        opp.startup_info.fundingStage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Contact:</span>
                    <span
                      className="truncate max-w-35 text-zinc-800 dark:text-zinc-200"
                      title={
                        opp.startup_info.founder_email ||
                        opp.startup_info.founderEmail
                      }
                    >
                      {opp.startup_info.founder_email ||
                        opp.startup_info.founderEmail}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesDetails;
