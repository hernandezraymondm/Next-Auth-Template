import { Frown } from "lucide-react";
import { FormAlert } from "@/components/form-alert";
import { CardWrapper } from "@/components/auth/card-wrapper";

interface VerificationErrorProps {
  error: string;
}

export const VerificationError = ({ error }: VerificationErrorProps) => (
  <CardWrapper
    size="md"
    icon={<Frown size="60" className="text-white bg-red-400 rounded-full" />}
    headerLabel="Oops! Something went wrong!"
    backButtonLink="Back to login"
    backButtonHref="/auth/login"
    isBackArrowed={true}
    className="!text-gray-600"
  >
    <div className="w-full flex flex-col place-items-center gap-4">
      <p className="paragraph text-center">
        Please contact us if this error persists. <br />
        When reaching out, be sure to provide the unique error code so we can
        quickly identify and address the problem. <br />
        Your unique error code is:{" "}
        <code className="rounded-sm bg-slate-100 p-1 text-xs">{error}</code>
      </p>
      <FormAlert message={error} variant="error" />
    </div>
  </CardWrapper>
);
