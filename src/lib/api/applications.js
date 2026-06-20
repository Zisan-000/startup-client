"use server";
import { revalidatePath } from "next/cache";
import { protectedFetch, serverFetch } from "../core/server";

export const getApplicationsByApplicant = async (email) => {
  return protectedFetch(`/api/my-applications?email=${email}`);
};

export const getApplicationsByFounder = async (email) => {
  const result = protectedFetch(`/api/founder-applications?email=${email}`);
  return result;
};
