"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
  link: string;
  href: string;
  isArrowed?: boolean;
}

export const BackButton = ({
  label,
  link,
  href,
  isArrowed = false,
}: BackButtonProps) => {
  return (
    <div className="w-full flex place-content-center">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Button variant="ghost" className="font-normal" size="custom" asChild>
        <Link href={href}>
          <span className="link flex items-center gap-1">
            {link} {isArrowed && <MoveRight />}
          </span>
        </Link>
      </Button>
    </div>
  );
};
