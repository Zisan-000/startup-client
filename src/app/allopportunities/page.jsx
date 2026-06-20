import BrowseOpportunitiesSection from "@/components/opportunities/BrowseOpportunitiesSection";
import OpportunitiesCard from "@/components/opportunities/OpportunitiesCard";
import { getAllOpportunities } from "@/lib/api/opportunities";
import React from "react";

const AllOpportunitiesPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const querySearchParams = new URLSearchParams(filters);
  const queryString = querySearchParams.toString();

  const opportunities = await getAllOpportunities(queryString);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 py-12">
      {/* <h1>All Opportunities</h1> */}
      {/* <OpportunitiesCard opportunities={opportunities}></OpportunitiesCard> */}
      <BrowseOpportunitiesSection
        filters={filters}
        initialOpportunities={opportunities}
      />
    </div>
  );
};

export default AllOpportunitiesPage;
