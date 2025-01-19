import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";

/**
 * Generates a new verification token for a given email.
 * If an existing token is found for the email, it will be deleted and replaced with a new token.
 *
 * @param {string} email - The email address for which to generate the verification token.
 * @returns {Promise<Object>} - A promise that resolves to the newly created verification token.
 */
export const generateVerificationToken = async (
  email: string
): Promise<VerificationToken> => {
  const token = uuidv4();
  const code = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit code
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  // Delete existing token
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create a new token
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      code,
      expires,
    },
  });

  return verificationToken;
};
