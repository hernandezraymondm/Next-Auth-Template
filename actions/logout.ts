"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // Use case: When you need to do server stuff first before you logout
  await signOut();
};
