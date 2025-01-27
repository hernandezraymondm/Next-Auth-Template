"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
  link: string;
  href: string;
  isArrowed?: boolean;
  className?: string | undefined;
}

export const BackButton = ({
  label,
  link,
  href,
  isArrowed = false,
  className,
}: BackButtonProps) => {
  return (
    <div className="w-full flex place-content-center">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Button variant={"link"} size="custom" asChild>
        <Link href={href}>
          <span
            className={cn(
              "drop-shadow-md link flex items-center gap-1 ",
              className
            )}
          >
            {isArrowed && <HiMiniArrowSmallLeft />}
            {link}
          </span>
        </Link>
      </Button>
    </div>
  );
};
