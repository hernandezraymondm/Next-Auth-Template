import React, { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary to-neutral h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
