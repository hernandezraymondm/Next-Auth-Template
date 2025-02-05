"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SamplePage = () => {
  const session = useSession();

  const handleSignOut = () => {
    signOut();
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
