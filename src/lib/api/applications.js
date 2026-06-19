import { serverFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicant) => {
  return serverFetch(`/api/applications?applicantEmail=${applicant}`);
};
