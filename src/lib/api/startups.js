import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getStartups = async (startupId) => {
  return protectedFetch(`/api/my/startups?startupId=${startupId}`);
};

export const getStartup = async () => {
  return protectedFetch(`/api/startups`);
};
