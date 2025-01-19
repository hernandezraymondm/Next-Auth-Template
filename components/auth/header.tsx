import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { EarthLock } from "lucide-react";
import Link from "next/link";
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
        <div className="w-full flex items-center justify-center text-gray-800 drop-shadow-md">
          <EarthLock size={30} />
          <h1 className={cn("text-3xl font-semibold", font.className)}>
            VeriSafe
          </h1>
        </div>
      </Link>

      <div className="w-full flex flex-col items-center justify-center gap-1">
        <div className={icon ? "p-1" : ""}>{icon}</div>
        <p className="font-semibold text-gray-800 uppercase">{label}</p>
        {separator && <Separator className="mt-5" />}
        <p className="text-muted-foreground text-sm">{subLabel}</p>
      </div>
    </div>
  );
};
