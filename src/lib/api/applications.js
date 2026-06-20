"use server";
import { revalidatePath } from "next/cache";
import { serverFetch } from "../core/server";

export const getApplicationsByApplicant = async (email) => {
  return serverFetch(`/api/my-applications?email=${email}`);
};

export const getApplicationsByFounder = async (email) => {
  const result = serverFetch(`/api/founder-applications?email=${email}`);
  return result;
};
