"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByTokenAndCode } from "@/data/reset-token";

export const verifyNewPassword = async (
  token: string,
  values: z.infer<typeof NewPasswordSchema>
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { code, password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  const hashedPassword = await bcrypt.hash(password, 11);

  const resetPasswordRecord = await getPasswordResetTokenByTokenAndCode(
    token,
    code
  );

  if (!resetPasswordRecord) {
    return { error: "Invalid 6-digit code" };
  }

  const hasExpired = new Date(resetPasswordRecord.expires) < new Date();

  if (hasExpired) {
    return { error: "Reset password code has expired" };
  }

  const existingUser = await getUserByEmail(resetPasswordRecord.email);

  if (!existingUser) {
    return { error: "User not found" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: resetPasswordRecord.id },
  });

  return { success: "Password Updated!" };
};
