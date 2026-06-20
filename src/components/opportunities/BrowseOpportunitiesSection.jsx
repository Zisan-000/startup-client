"use client";

import React, { useState, useEffect, useCallback } from "react";
import OpportunitiesFilter from "./OpportunitiesFilter";
import OpportunitiesCard from "./OpportunitiesCard";

export default function BrowseOpportunitiesSection({
  initialOpportunities,
  filters,
}) {
  const [activeFilters, setActiveFilters] = useState({
    search: filters?.search || "",
    workType: filters?.workType || "",
    industry: filters?.industry || "",
    page: parseInt(filters?.page) || 1,
  });

  const [opportunities, setOpportunities] = useState(
    initialOpportunities?.opportunities || initialOpportunities || [],
  );
  const [totalItems, setTotalItems] = useState(
    initialOpportunities?.total || 0,
  );
  const [totalPages, setTotalPages] = useState(
    initialOpportunities?.totalPages || 1,
  );

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const params = new URLSearchParams();
        if (activeFilters.search) params.append("search", activeFilters.search);
        if (activeFilters.workType)
          params.append("workType", activeFilters.workType);
        if (activeFilters.industry)
          params.append("industry", activeFilters.industry);
        if (activeFilters.page) params.append("page", activeFilters.page);

        const res = await fetch(
          `https://startup-server-khaki.vercel.app/api/opportunities?${params.toString()}`,
        );
        if (!res.ok) throw new Error("Network error fetching query results");

        const data = await res.json();

        setOpportunities(data.opportunities || []);
        setTotalItems(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching live backend filter sets:", err);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFilteredData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [activeFilters]);

  // --- THE FIX IS HERE ---
  // Wrap in useCallback so the function reference never changes on pagination
  const handleFilterUpdate = useCallback((newFilters) => {
    setActiveFilters((prev) => {
      // Safety Check: Only reset to page 1 if the filter strings ACTUALLY changed.
      // If they are exactly the same, do absolutely nothing.
      if (
        prev.search === newFilters.search &&
        prev.workType === newFilters.workType &&
        prev.industry === newFilters.industry
      ) {
        return prev;
      }

      // If a filter did change, update it and restart at page 1
      return { ...prev, ...newFilters, page: 1 };
    });
  }, []); // Empty dependency array means this function is built once and locked in!

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 max-w-2xl my-4">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Explore Opportunities
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          Join disruptive startup teams and collaborate with visionary creators
          to bring game-changing ideas to life.
        </p>
      </div>

      <div className="shadow-xl rounded-2xl shadow-emerald-100">
        <OpportunitiesFilter
          filters={filters}
          onFilterChange={handleFilterUpdate}
        />
      </div>

      <OpportunitiesCard
        opportunities={opportunities}
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={activeFilters.page}
        onPageChange={(newPage) =>
          setActiveFilters((prev) => ({ ...prev, page: newPage }))
        }
      />
    </div>
  );
}
