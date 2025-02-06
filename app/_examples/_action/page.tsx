"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

const SamplePage = () => {
  const session = useSession();

  const handleSignOut = () => {
    logout();
  };

  return (
    <div>
      {JSON.stringify(session)}
      <Button type="submit" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default SamplePage;
