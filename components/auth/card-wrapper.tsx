"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { SiClerk } from "react-icons/si";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerSubLabel: string;
  backButtonLabel: string;
  backButtonLink: string;
  backButtonHref: string;
  showSocial?: boolean;
  showFooter?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerSubLabel,
  backButtonLabel,
  backButtonLink,
  backButtonHref,
  showSocial,
  showFooter,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-2xl bg-neutral">
      <CardHeader className="bg-card rounded-t-xl">
        <Header label={headerLabel} subLabel={headerSubLabel} />
      </CardHeader>

      <CardContent className="bg-card rounded-b-2xl drop-shadow-sm">
        {showSocial && <Social />}
        {children}
      </CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          link={backButtonLink}
          href={backButtonHref}
        />
      </CardFooter>
      {showFooter && (
        <CardFooter className="border-t-2 border-muted rounded-b-xl">
          <div className="w-full flex place-content-center gap-1 text-muted-foreground text-sm font-semibold">
            <p>Secured by</p>

            <div className="flex place-items-center">
              <SiClerk />
              clerk
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
