import React from "react";
import CreateStartup from "./CreateStartup";
import { getUserSession } from "@/lib/core/session";

const StartupPage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <CreateStartup startup={user} />
    </div>
  );
};

export default StartupPage;
