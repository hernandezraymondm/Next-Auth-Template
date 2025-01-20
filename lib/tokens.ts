import { VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";
import {
  getVerificationTokenByEmail,
  getVerificationTokenByEmailAndToken,
} from "@/data/verification-token";
import {
  generateUUID,
  generateVerificationCode,
  generateExpirationDate,
} from "@/lib/utils";

/**
 * Generates a new verification token for a given email.
 * If an existing token is found for the email, it will be deleted and replaced with a new token.
 *
 * @param {string} email - The email address for which to generate the verification token.
 * @returns {Promise<VerificationToken>} - A promise that resolves to the newly created verification token.
 */
export const generateVerificationToken = async (
  email: string
): Promise<VerificationToken> => {
  const token = generateUUID();
  const code = generateVerificationCode(); // Generate a 6-digit code
  const expires = generateExpirationDate(1); // 1 hour

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

/**
 * Generates a new verification code for a given email.
 * If an existing code is found for the email, it will be deleted and replaced with a new code.
 *
 * @param {string} email - The email address for which to generate the verification code.
 * @param {string} token - The token for which to generate the verification code.
 * @returns {Promise<VerificationToken>} - A promise that resolves to the newly created verification token.
 */
export const updateVerificationCode = async (
  email: string,
  token: string
): Promise<VerificationToken> => {
  const newToken = generateUUID();
  const code = generateVerificationCode(); // Generate a 6-digit code
  const expires = generateExpirationDate(1); // 1 hour

  const existingToken = await getVerificationTokenByEmailAndToken(email, token);

  const verificationToken = existingToken
    ? await db.verificationToken.update({
        where: { id: existingToken.id },
        data: { code, expires },
      })
    : await db.verificationToken.create({
        data: {
          email,
          token: newToken,
          code,
          expires,
        },
      });

  return verificationToken;
};
