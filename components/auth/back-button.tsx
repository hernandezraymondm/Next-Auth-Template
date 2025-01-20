"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonVariant } from "@/lib/enums"; // Update the import path as needed

interface BackButtonProps {
  label?: string;
  link: string;
  href: string;
  variant?: ButtonVariant;
}

export const BackButton = ({
  label,
  link,
  href,
  variant = ButtonVariant.Link,
}: BackButtonProps) => {
  return (
    <div className="w-full flex place-content-center">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Button variant={variant} className="font-normal" size="custom" asChild>
        <Link href={href}>
          <span className="link flex items-center gap-1">{link}</span>
        </Link>
      </Button>
    </div>
  );
};
