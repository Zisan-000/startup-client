import { getUserSession } from "@/lib/core/session";
import React from "react";
import AddOpportunity from "./AddOpportunity";
import { getOpportunities } from "@/lib/api/opportunities";
import { CircleInfo, Flame } from "@gravity-ui/icons";
import Link from "next/link";

const OpportunitiesPage = async () => {
  const user = await getUserSession();
  const initialOpportunities = await getOpportunities(user?.id);
  const opportunitiesCount = initialOpportunities?.length || 0;

  // Plan configuration: Check if user has upgraded to premium
  const isPremium = user?.plan === "premium";
  const PLAN_LIMIT = 3;

  // Rule: If premium, they have infinite postings. If free, lock at limit.
  const hasExceededLimit = !isPremium && opportunitiesCount >= PLAN_LIMIT;

  return (
    <div className="bg-zinc-50 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Analytics & Plan Header */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Your Posted Positions
            </h1>
            <p className="text-sm text-zinc-500">
              Manage usage quotas and active recruitment pipelines.
            </p>
          </div>

          {/* Usage Meter Badge */}
          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl">
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Current Plan Quota
              </p>
              <p className="text-lg font-bold text-zinc-900">
                {opportunitiesCount}{" "}
                <span className="text-sm font-normal text-zinc-500">
                  {isPremium ? "/ Unlimited (Premium)" : `/ ${PLAN_LIMIT} Free`}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Action Container */}
        <div className="relative">
          {/* Conditional Blurry Premium Paywall Screen */}
          {hasExceededLimit && (
            <div className="absolute inset-0 z-50 rounded-2xl bg-zinc-100/20 backdrop-blur-[6px] border border-zinc-200/50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="max-w-md bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
                  <Flame size={22} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-zinc-900">
                    Upgrade to Premium
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    You have successfully published{" "}
                    <strong className="text-zinc-900">
                      {opportunitiesCount} opportunities
                    </strong>
                    . Free-tier accounts are restricted to {PLAN_LIMIT} creation
                    nodes maximum.
                  </p>
                </div>
                <Link href={"/plans"} className="block w-full">
                  <button className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-zinc-900 text-white hover:opacity-90 transition shadow-sm">
                    Unlock Unlimited Posting
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Creation Form Frame */}
          <div
            className={
              hasExceededLimit
                ? "pointer-events-none select-none opacity-40"
                : ""
            }
          >
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 text-zinc-400 pb-2 border-b border-zinc-100">
                <CircleInfo size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Configure Requirements Profile
                </span>
              </div>
              <AddOpportunity startup={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
