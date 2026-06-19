"use client";

import React, { useState, useEffect } from "react";
import OpportunitiesFilter from "./OpportunitiesFilter";
import OpportunitiesCard from "./OpportunitiesCard";

export default function BrowseOpportunitiesSection({ initialOpportunities }) {
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    workType: "",
    industry: "",
  });
  const [opportunities, setOpportunities] = useState(initialOpportunities);

  useEffect(() => {
    const fetchFilteredData = async () => {
      // If all filters are cleared, reset back to initial static server data instantly
      if (
        !activeFilters.search &&
        !activeFilters.workType &&
        !activeFilters.industry
      ) {
        setOpportunities(initialOpportunities);
        return;
      }

      try {
        // Construct query parameters safely
        const params = new URLSearchParams();
        if (activeFilters.search) params.append("search", activeFilters.search);
        if (activeFilters.workType)
          params.append("workType", activeFilters.workType);
        if (activeFilters.industry)
          params.append("industry", activeFilters.industry);

        // Fetching from your updated Express aggregation endpoint
        const res = await fetch(
          `http://localhost:5000/api/opportunities?${params.toString()}`,
        );
        if (!res.ok) throw new Error("Network error fetching query results");

        const data = await res.json();
        setOpportunities(data);
      } catch (err) {
        console.error("Error fetching live backend filter sets:", err);
      }
    };

    // Debounce processing window setup
    const delayDebounceFn = setTimeout(() => {
      fetchFilteredData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [activeFilters, initialOpportunities]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header Moved to the Top */}
      <div className="flex flex-col gap-2 max-w-2xl my-4">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Explore Opportunities
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          Join disruptive startup teams and collaborate with visionary creators
          to bring game-changing ideas to life.
        </p>
      </div>

      {/* 2. Filter Bar sits right underneath the header */}
      <div className="shadow-xl rounded-2xl shadow-emerald-100">
        <OpportunitiesFilter onFilterChange={setActiveFilters} />
      </div>
      {/* 3. Cards Grid at the bottom */}
      <OpportunitiesCard opportunities={opportunities} />
    </div>
  );
}
