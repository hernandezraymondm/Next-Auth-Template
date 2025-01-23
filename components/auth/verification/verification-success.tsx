import { CircleCheckBig } from "lucide-react";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const VerificationSuccess = () => (
  <CardWrapper
    size="md"
    icon={
      <CircleCheckBig
        size="60"
        className="text-white bg-green-400 rounded-full"
      />
    }
    headerLabel="Verification Success!"
    backButtonLink="Back to login"
    backButtonHref="/auth/login"
    isBackArrowed={true}
    className="font-semibold !text-gray-600"
  >
    <div className="w-full flex flex-col place-items-center gap-4">
      <p className="paragraph text-center">
        Thank you for your support, we are pleased to inform you that your
        account is now ready for use. <br />
        You can now sign in with your email address.
      </p>
    </div>
  </CardWrapper>
);
