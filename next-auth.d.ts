/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

export type UserSessionType = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

// declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//   }
// }

declare module "next-auth" {
  interface User {
    role: UserRole;
    emailVerified: Date | null;
    isTwoFactorEnabled: boolean;
  }

  interface Session {
    user: {
      role: UserRole;
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    isTwoFactorEnabled: boolean;
  }
}
