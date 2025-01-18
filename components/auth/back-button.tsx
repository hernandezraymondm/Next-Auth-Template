"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
  link: string;
  href: string;
}

export const BackButton = ({ label, link, href }: BackButtonProps) => {
  return (
    <div className="w-full flex place-content-center">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Button variant="link" className="font-normal" size="custom" asChild>
        <Link href={href}>
          <p className="link">{link}</p>
        </Link>
      </Button>
    </div>
  );
};
