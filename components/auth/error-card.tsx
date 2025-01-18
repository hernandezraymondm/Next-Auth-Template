"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Frown } from "lucide-react";
import { useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  ),
};

export const ErrorCard = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") as Error;

  return (
    <CardWrapper
      icon={<Frown size="60" className="text-white bg-red-400 rounded-full" />}
      headerLabel="Oops! Something went wrong!"
      backButtonLink="Return to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex flex-col place-items-center gap-4">
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[urlError] || "Please contact us if this error persists."}
        </div>
      </div>
    </CardWrapper>
  );
};
