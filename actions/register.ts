"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationLink } from "@/lib/verification";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 11);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  // Generate verification token
  const verificationToken = await generateVerificationLink(email);

  const expiration = verificationToken.expires.getTime(); // convert to milliseconds

  // Send verification email
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    verificationToken.code,
    expiration.toString()
  );

  return {
    success: `A Verification email has been sent to ${verificationToken.email}. `,
  };
};
