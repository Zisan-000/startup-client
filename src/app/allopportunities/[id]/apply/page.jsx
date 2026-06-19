import { getOpportunitiesById } from "@/lib/api/opportunities";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyForm from "./ApplyForm";
import { getApplicationsByApplicant } from "@/lib/api/applications";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/login?redirect=/allopportunities/${id}/apply`);
  }

  if (user?.role !== "collaborator") {
    return (
      <div className="text-5xl font-bold text-center flex items-center justify-center min-h-screen text-red-500">
        Only Collaborators can apply for the opportunities.
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user?.email);

  const opportunity = await getOpportunitiesById(id);

  return (
    <div className="my-10">
      <h2 className="flex justify-center my-5 text-center">
        You have applied so far :{" "}
        <span className="font-bold text-red-500 pl-1">
          {applications.length}
        </span>
      </h2>
      <ApplyForm user={user} opportunity={opportunity}></ApplyForm>
    </div>
  );
};

export default ApplyPage;
