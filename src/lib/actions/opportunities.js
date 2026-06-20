"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createOpportunity = async (newOpportunityData) => {
  return serverMutation("/api/opportunities", newOpportunityData);
};

export const updateOpportunityInfo = async (id, data) => {
  const result = await serverMutation(
    `/api/opportunitiesinfo/${id}`,
    data,
    "PATCH",
  );
  revalidatePath("/dashboard/founder/opportunities/manageOpportunities");
  return result;
};

export const deleteOpportunityInfo = async (id) => {
  const result = await serverMutation(
    `/api/opportunitiesinfo/${id}`,
    {},
    "DELETE",
  );
  revalidatePath("/dashboard/founder/opportunities/manageOpportunities");
  return result;
};
