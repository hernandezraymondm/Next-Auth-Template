import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { EarthLock } from "lucide-react";
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
        <div className="w-full flex items-center justify-center text-accent-highlight drop-shadow-md">
          <EarthLock size={30} />
          <h1 className={cn("text-3xl font-semibold", font.className)}>
            VeriSafe
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
