import React from "react";
import CreateStartup from "./CreateStartup";
import { getUserSession } from "@/lib/core/session";
import { getStartups } from "@/lib/api/startups";

const StartupPage = async () => {
  const user = await getUserSession();
  const startups = await getStartups(user?.id);
  return (
    <div>
      <CreateStartup startup={user} startups={startups} />
    </div>
  );
};

export default StartupPage;
