import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  subLabel?: string;
}

export const Header = ({ label, subLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link href="/">
        <div className="w-full flex items-center justify-center hover:text-accent-highlight drop-shadow-md">
          <ShieldCheck size={30} />
          <h1 className={cn("text-3xl font-semibold", font.className)}>
            NextGuard
          </h1>
        </div>
      </Link>

      <div className="w-full flex flex-col items-center justify-center gap-1">
        <p className="font-semibold">{label}</p>
        <p className="text-muted-foreground text-sm">{subLabel}</p>
      </div>
    </div>
  );
};
