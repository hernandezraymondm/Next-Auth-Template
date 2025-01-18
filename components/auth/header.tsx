import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { EarthLock } from "lucide-react";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  icon?: React.ReactNode;
  label: string;
  subLabel?: string;
}

export const Header = ({ icon, label, subLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      <Link href="/">
        <div className="w-full flex items-center justify-center text-gray-800 drop-shadow-md">
          <EarthLock size={30} />
          <h1 className={cn("text-3xl font-semibold", font.className)}>
            VeriSafe
          </h1>
        </div>
      </Link>

      <div className="w-full flex flex-col items-center justify-center gap-1">
        <div className={icon ? "p-1" : ""}>{icon}</div>
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-muted-foreground text-sm">{subLabel}</p>
      </div>
    </div>
  );
};
