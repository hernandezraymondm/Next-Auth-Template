"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { SiClerk } from "react-icons/si";
import { ButtonVariant } from "@/lib/enums";

interface CardWrapperProps {
  children: React.ReactNode;
  cardSize: string;
  icon?: React.ReactNode;
  headerLabel: string;
  separator?: boolean;
  headerSubLabel?: string;
  backButtonLabel?: string;
  backButtonLink: string;
  backButtonHref: string;
  backVariant?: ButtonVariant;
  showSocial?: boolean;
  showFooter?: boolean;
}

export const CardWrapper = ({
  children,
  cardSize,
  icon,
  headerLabel,
  separator,
  headerSubLabel,
  backButtonLabel,
  backButtonLink,
  backButtonHref,
  backVariant,
  showSocial,
  showFooter,
}: CardWrapperProps) => {
  return (
    <Card className={cn("shadow-2xl bg-smoke", cardSize)}>
      <CardHeader className="card-header">
        <Header
          icon={icon}
          label={headerLabel}
          separator={separator}
          subLabel={headerSubLabel}
        />
      </CardHeader>

      <CardContent className="card-content">
        {showSocial && <Social />}
        {children}
      </CardContent>
      <CardFooter className="shadow-sm">
        <BackButton
          label={backButtonLabel}
          link={backButtonLink}
          href={backButtonHref}
          variant={backVariant}
        />
      </CardFooter>
      {showFooter && (
        <CardFooter className="card-footer">
          <div className="card-footer-content">
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
