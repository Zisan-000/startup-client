const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getStartups = async (startupId, status = "approved") => {
  const res = await fetch(
    `${baseUrl}/api/my/startups?startupId=${startupId}&status=${status}`,
  );
  return res.json();
};
