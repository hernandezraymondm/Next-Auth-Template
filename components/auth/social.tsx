"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          className="flex flex-grow drop-shadow-md"
          variant="outline"
          onClick={() => {
            onClick("google");
          }}
        >
          <FcGoogle className="h-5 w-5 mr-2" /> Google
        </Button>
        <Button
          className="flex flex-grow drop-shadow-md"
          variant="outline"
          onClick={() => {
            onClick("facebook");
          }}
        >
          <SiFacebook className="h-5 w-5 mr-2" color="#0866ff" /> Facebook
        </Button>
      </div>

      <div className="flex items-center gap-3 py-6">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs">
          Or continue with email
        </span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
};
