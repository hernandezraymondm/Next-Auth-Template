import { loginAttempts } from "@/lib/login-utils";

export const unlockAccount = (email: string) => {
  if (loginAttempts.has(email)) {
    // Remove the user's entry
    loginAttempts.delete(email);
    return { success: "Account unlocked successfully." };
  }

  return { error: "User not found or not locked." };
};
