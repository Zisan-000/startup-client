import BrowseOpportunitiesSection from "@/components/opportunities/BrowseOpportunitiesSection";
import { getAllOpportunities } from "@/lib/api/opportunities";
import React from "react";

const page = async () => {
  const opportunities = await getAllOpportunities();
  return (
    <div className="my-10">
      {/* <h2>Collaborator Dashboard</h2> */}
      <BrowseOpportunitiesSection initialOpportunities={opportunities} />
    </div>
  );
};

export default page;
