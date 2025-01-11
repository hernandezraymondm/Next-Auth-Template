"use client";

import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Social = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-3 pb-6">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs">Or continue with</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="lg"
          className="flex flex-grow font-bold"
          variant="outline"
          onClick={() => {}}
        >
          <FcGoogle className="h-5 w-5 mr-2" /> Google
        </Button>
        <Button
          size="lg"
          className="flex flex-grow font-bold"
          variant="outline"
          onClick={() => {}}
        >
          <SiFacebook className="h-5 w-5 mr-2" color="#0866ff" /> Facebook
        </Button>
      </div>
    </div>
  );
};
