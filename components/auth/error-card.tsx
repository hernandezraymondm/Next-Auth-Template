"use client";

import { Frown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormAlert } from "@/components/form-alert";
import { CardWrapper } from "@/components/auth/card-wrapper";

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
      size="md"
      icon={<Frown size="60" className="text-white bg-red-400 rounded-full" />}
      headerLabel="Oops! Something went wrong!"
      backButtonLink="Back to login"
      backButtonHref="/auth/login"
      isBackArrowed={true}
      className="font-semibold !text-gray-600"
    >
      <div className="w-full flex flex-col place-items-center gap-4">
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[urlError] || (
            <p className="text-center">
              Please contact us if this error persists. <br /> When reaching
              out, be sure to provide the unique error code so we can quickly
              identify and address the problem. <br /> Your unique error code
              is:{" "}
              <code className="rounded-sm bg-slate-100 p-1 text-xs">
                Unexpected OAuth Error
              </code>
            </p>
          )}
        </div>
        <FormAlert
          message={urlError || "Unexpected OAuth Error"}
          variant="error"
        />
      </div>
    </CardWrapper>
  );
};
