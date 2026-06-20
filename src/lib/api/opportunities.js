import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getAllOpportunities = async () => {
  return protectedFetch("/api/opportunities");
};

export const getOpportunitiesById = async (id) => {
  return protectedFetch(`/api/opportunities/${id}`);
};

export const getOpportunities = async (startup_id) => {
  return protectedFetch(`/api/my/opportunities?startup_id=${startup_id}`);
};
