import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getAllOpportunities = async () => {
  return serverFetch("/api/opportunities");
};

export const getOpportunitiesById = async (id) => {
  return serverFetch(`/api/opportunities/${id}`);
};

export const getOpportunities = async (startup_id) => {
  return serverFetch(`/api/my/opportunities?startup_id=${startup_id}`);
};
