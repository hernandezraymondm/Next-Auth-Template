"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import {
  checkLockoutStatus,
  handleFailedLogin,
  handleUnverifiedEmail,
} from "@/lib/auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  // Check lockout status
  const { locked, remainingTime } = await checkLockoutStatus(email);
  if (locked) {
    return {
      error: `Account is locked. Please try again in ${Math.ceil(
        remainingTime
      )} seconds.`,
    };
  }

  // Handle password verification and failed login attempts
  const loginResult = await handleFailedLogin(email, password, existingUser);
  if (loginResult.error) {
    return loginResult; // Return error if there was a failed attempt
  }

  // Check if email is verified
  if (!existingUser.emailVerified) {
    const verificationToken = await handleUnverifiedEmail(email);
    redirect(`/auth/verification/${verificationToken?.token}`);
  }

  // Proceed with login if everything checks out
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Oops! Something went wrong!" };
      }
    }
    throw error;
  }
};
