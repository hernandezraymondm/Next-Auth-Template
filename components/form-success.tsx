import { CircleCheckBig } from "lucide-react";
import { CardWrapper } from "@/components/auth/card-wrapper";

interface FormSuccessProps {
  headerLabel: string;
  mainMessage: string;
  subMessage?: string;
}

export const FormSuccess = ({
  headerLabel,
  mainMessage,
  subMessage,
}: FormSuccessProps) => (
  <CardWrapper
    size="md"
    icon={
      <CircleCheckBig
        size="60"
        className="text-white bg-green-400 rounded-full"
      />
    }
    headerLabel={headerLabel}
    backButtonLink="Back to login"
    backButtonHref="/auth/login"
    isBackArrowed={true}
    className="font-semibold !text-gray-600"
  >
    <div className="w-full flex flex-col place-items-center gap-4 -mt-5">
      <p className="paragraph text-center">
        {mainMessage}
        <br />
        {subMessage}
      </p>
    </div>
  </CardWrapper>
);
