"use client";

import { logout } from "@/actions/logout";
import { ReactNode } from "react";

interface LogoutButtonProps {
  children?: ReactNode;
}

export const logoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
