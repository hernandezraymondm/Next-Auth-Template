"use client";

import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Social = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center w-full gap-x-2">
        <Button
          size="lg"
          className="w-full rounded-full font-bold"
          variant="outline"
          onClick={() => {}}
        >
          <FcGoogle className="h-5 w-5" /> Google
        </Button>
        <Button
          size="lg"
          className="w-full rounded-full font-bold"
          variant="outline"
          onClick={() => {}}
        >
          <SiFacebook className="h-5 w-5" color="#0866ff" /> Facebook
        </Button>
      </div>
      <div className="flex items-center gap-3 py-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs ">
          Or continue with email
        </span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
};
