import React from "react";
import { getUserSession } from "@/lib/core/session";
import ManageApplicationsTable from "@/components/ManageApplicationsTable";
import { getApplicationsByFounder } from "@/lib/api/applications";

export const dynamic = "force-dynamic";

const ApplicationPage = async () => {
  const user = await getUserSession();

  // FIXED: Query applications targeted at this founder's open roles using their email
  const applications = user?.email
    ? await getApplicationsByFounder(user?.email)
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen bg-white">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Venture Applications
        </h1>
        <p className="text-sm text-zinc-500">
          Review talent requests and manage candidate updates for your open
          roles
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="border border-dashed border-zinc-200 bg-white rounded-2xl p-12 text-center text-zinc-500 shadow-sm">
          No candidates have applied to your opportunities yet.
        </div>
      ) : (
        <ManageApplicationsTable initialApplications={applications} />
      )}
    </div>
  );
};

export default ApplicationPage;
