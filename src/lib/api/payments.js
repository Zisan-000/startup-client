import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getPayments = async () => {
  return protectedFetch(`/api/payments`);
};
