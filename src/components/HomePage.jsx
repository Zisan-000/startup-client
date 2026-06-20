import React from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import { FaRocket, FaLeaf, FaRobot, FaMoneyBillWave } from "react-icons/fa";

// ─── API ACTIONS ─────────────────────────────────────────────────────────────
import { getStartup } from "@/lib/api/startups";
import { getAllOpportunities } from "@/lib/api/opportunities";

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const whyItems = [
  {
    num: "01",
    icon: FiUsers,
    title: "Curated Talent Match",
    desc: "We bypass recruiting noise. Our platform directly connects technical needs with verified, passionate engineers.",
  },
  {
    num: "02",
    icon: FiTrendingUp,
    title: "Accelerated Growth",
    desc: "Access resources, funding pipelines, and mentorship designed to scale pre-seed and seed-stage ventures.",
  },
  {
    num: "03",
    icon: FaRocket,
    title: "Instant Visibility",
    desc: "Publish your startup profile and immediately reach thousands of potential co-founders and early adopters.",
  },
];

const dynamicIcons = [FaLeaf, FaRobot, FaMoneyBillWave, FiBriefcase, FiUsers];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default async function HomePage() {
  let startupsData = [];
  let opportunitiesData = [];

  try {
    const data = await Promise.all([getStartup(), getAllOpportunities()]);
    startupsData = data[0];
    opportunitiesData = data[1];
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }

  const featuredStartups = Array.isArray(startupsData)
    ? startupsData.slice(0, 6)
    : [];
  const oppsArray = opportunitiesData?.opportunities || opportunitiesData;
  const featuredOpportunities = Array.isArray(oppsArray)
    ? oppsArray.slice(0, 6)
    : [];

  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans w-full">
      {/* ── 1. HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        {/* Fixed Stretched Badge: changed inline-block to mx-auto display block style */}
        <div className="inline-flex justify-center items-center bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-bold uppercase px-4 py-1.5 rounded-full mb-6">
          Venture Ecosystem — Est. 2024
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 max-w-4xl mb-6 leading-tight">
          Where founders find their{" "}
          <span className="text-indigo-600">next</span> team.
        </h1>

        {/* Description */}
        <p className="text-zinc-500 text-lg sm:text-xl max-w-2xl mb-10">
          Join the platform matching early-stage startups with the engineers,
          operators, and designers who want to build something that matters.
        </p>

        {/* Actions Layout */}
        <div className="flex flex-col sm:flex-row my-10 items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/allopportunities"
            className="flex items-center justify-center gap-2 px-10 w-full sm:w-52 h-12 bg-zinc-900 text-white font-bold rounded-xl text-base whitespace-nowrap"
          >
            Explore Roles <FiArrowRight />
          </Link>
          <Link
            href="/allstartups"
            className="flex items-center justify-center w-full sm:w-52 h-12 bg-white text-zinc-700 font-bold rounded-xl text-base border border-zinc-200 whitespace-nowrap"
          >
            Register a Startup
          </Link>
        </div>
      </section>

      {/* ── 2. STATS BAND ── */}
      <div className="bg-zinc-50 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "500+", label: "Active Startups" },
            { num: "1.2k", label: "Open Roles" },
            { num: "$50M", label: "Funding Raised" },
            { num: "10k+", label: "Talent Network" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-zinc-200 rounded-xl p-6 text-center shadow-sm"
            >
              <p className="text-3xl sm:text-4xl font-black text-zinc-900 mb-1">
                {stat.num}
              </p>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. FEATURED VENTURES ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="my-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Featured Ventures
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              The most promising teams currently expanding.
            </p>
          </div>
          <Link
            href="/allstartups"
            className="text-sm font-bold text-indigo-600 hover:underline"
          >
            View all ventures →
          </Link>
        </div>

        {featuredStartups.length === 0 ? (
          <div className="text-center py-12 bg-zinc-100 rounded-xl text-zinc-500 text-sm">
            No featured startups available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStartups.map((startup, index) => {
              const Icon = dynamicIcons[index % dynamicIcons.length];
              const startupId = startup._id?.$oid || startup._id || startup.id;

              return (
                <div
                  key={startupId}
                  className="bg-white p-6 rounded-2xl border border-zinc-200 flex flex-col justify-between"
                >
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">
                      {startup.name || startup.startup_name}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      By{" "}
                      {startup.founderEmail ||
                        startup.founder_email ||
                        "Visionary"}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-zinc-100">
                    <span className="text-[10px] font-bold px-2 py-1 bg-zinc-100 text-zinc-600 uppercase rounded">
                      {startup.industry || "General"}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-700 uppercase rounded">
                      {startup.fundingStage ||
                        startup.funding_stage ||
                        "Hiring"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 4. LATEST OPPORTUNITIES ── */}
      <section className="bg-zinc-100/60 border-y border-zinc-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="my-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Latest Opportunities
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Jumpstart your career by joining a fast-moving team.
              </p>
            </div>
            <Link
              href="/allopportunities"
              className="text-sm font-bold text-zinc-700 hover:underline"
            >
              Browse all roles →
            </Link>
          </div>

          {featuredOpportunities.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl text-zinc-500 text-sm border border-zinc-200">
              No recent opportunities listed.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {featuredOpportunities.map((opp) => {
                const oppId = opp._id?.$oid || opp._id || opp.id;
                const dateFormatted = opp.deadline
                  ? new Date(opp.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Open";

                return (
                  <div
                    key={oppId}
                    className="bg-white p-6 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-zinc-900 text-lg">
                        {opp.role_title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1">
                        <span className="flex items-center gap-1">
                          <FiBriefcase />{" "}
                          {opp.startup_info?.name ||
                            opp.startup_name ||
                            "Startup"}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock /> Closes: {dateFormatted}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 flex-1 justify-start sm:justify-center">
                      {opp.required_skills
                        ?.split(",")
                        .slice(0, 3)
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold px-2 py-1 bg-zinc-50 border border-zinc-200 text-zinc-600 rounded"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                    <div>
                      <Link
                        href={`/allopportunities/${oppId}`}
                        className="block text-center bg-zinc-900 text-white text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-zinc-800"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. WHY STARTUPFORGE ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">
          Why build with us?
        </h2>
        <p className="text-zinc-500 text-sm my-5">
          Everything you need to go from an idea to a fully operational venture
          team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-white p-6 rounded-2xl border border-zinc-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-zinc-300">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. BOTTOM CTA ── */}
      <section className="max-w-7xl mx-auto my-10 px-4 pb-20">
        <div className="bg-zinc-900 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to build the next big thing?
            </h2>
            <p className="text-zinc-400 text-sm">
              Join thousands of founders and builders shaping the future.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              href="/allopportunities"
              className="flex items-center justify-center gap-2 w-full sm:w-44 h-11 bg-white text-zinc-950 font-bold rounded-xl text-sm"
            >
              Explore Roles
            </Link>
            <Link
              href="/allstartups"
              className="flex items-center justify-center w-full sm:w-44 h-11 border bg-white border-zinc-700 text-zinc-300 font-bold rounded-xl text-sm"
            >
              List Your Startup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
