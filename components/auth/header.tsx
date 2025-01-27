import { Poppins } from "next/font/google";
import Link from "next/link";
import { EarthLock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  icon?: React.ReactNode;
  separator?: boolean;
  label: string;
  subLabel?: string;
}

export const Header = ({
  icon,
  separator = false,
  label,
  subLabel,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      <Link href="/">
        <div className="w-full flex items-center justify-center  drop-shadow-md text-accent">
          <EarthLock size={30} />
          <h1 className={cn("text-3xl font-semibold ", font.className)}>
            VeriSafe
          </h1>
        </div>
      </Link>

      <div className="w-full flex flex-col items-center justify-center gap-1">
        <div className={icon ? "p-3" : ""}>{icon}</div>
        <p className="font-semibold text-gray-800 text-lg">{label}</p>
        {separator && <Separator className="mt-5" />}
        <div className="text-muted-foreground text-sm text-center">
          {subLabel}
        </div>
      </div>
    </div>
  );
};
