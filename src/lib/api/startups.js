import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getStartups = async (startupId) => {
  const res = await fetch(`${baseUrl}/api/my/startups?startupId=${startupId}`);
  return res.json();
};

export const getStartup = async () => {
  return serverFetch(`/api/startups`);
};
