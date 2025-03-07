"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

const cardVariants = cva("shadow-2xl bg-background/90", {
  variants: {
    size: {
      sm: "w-[400px]",
      md: "w-[500px]",
      lg: "w-[600px]",
      xl: "w-[700px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface CardWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  headerLabel: string;
  separator?: boolean;
  headerSubLabel?: string;
  backButtonLabel?: string;
  backButtonLink: string;
  backButtonHref: string;
  isBackArrowed?: boolean;
  showSocial?: boolean;
}

const CardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>(
  (
    {
      className,
      size,
      children,
      icon,
      headerLabel,
      separator,
      headerSubLabel,
      backButtonLabel,
      backButtonLink,
      backButtonHref,
      isBackArrowed,
      showSocial,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(cardVariants({ size }), className)}
        {...props}
      >
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
            isArrowed={isBackArrowed}
            className={className}
          />
        </CardFooter>
      </Card>
    );
  }
);

CardWrapper.displayName = "CardWrapper";

export { CardWrapper };
