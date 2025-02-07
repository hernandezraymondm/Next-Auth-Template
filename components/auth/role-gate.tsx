"use client";

import { UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormAlert } from "../form-alert";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormAlert
        message="You do not have permission to view this content!"
        variant="error"
      />
    );
  }

  return <>{children}</>;
};
