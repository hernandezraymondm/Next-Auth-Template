"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const userSession = await currentUser();

  if (!userSession) {
    return { error: "Unauthorized" };
  }

  const userStore = await getUserById(userSession.id);

  if (!userStore) {
    return { error: "Unauthorized" };
  }

  if (userSession.provider !== "credentials") {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== userSession.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== userSession.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      verificationToken.code
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && userStore.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      userStore.password
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: userStore.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated!" };
};
