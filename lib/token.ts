import { VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";
import {
  getVerificationTokensByEmail,
  getVerificationTokenByTokenAndEmail,
} from "@/data/verification-token";
import { getPasswordResetTokensByEmail } from "@/data/reset-token";
import { generateUUID, generateOTP, generateExpirationDate } from "@/lib/utils";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = generateOTP();
  const expires = generateExpirationDate(24);
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = generateUUID();
  const code = generateOTP(); // Generate a 6-digit code
  const expires = generateExpirationDate(24); // 1 hour

  const existingTokens = await getPasswordResetTokensByEmail(email);

  // Delete existing tokens
  if (existingTokens.length > 0) {
    try {
      await db.passwordResetToken.deleteMany({ where: { email } });
      console.log(`Deleted all reset password  tokens for ${email}.`);
    } catch (error) {
      console.error(
        `Failed to delete reset password tokens for ${email}:`,
        error
      );
    }
  }

  // Create a new token
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
      code,
    },
  });

  return passwordResetToken;
};

/**
 * Generates a new verification token for a given email.
 * If an existing token is found for the email, it will be deleted and replaced with a new token.
 */
export const generateVerificationToken = async (
  email: string
): Promise<VerificationToken> => {
  const token = generateUUID();
  const code = generateOTP(); // Generate a 6-digit code
  const expires = generateExpirationDate(24); // 1 hour

  const existingTokens = await getVerificationTokensByEmail(email);

  // Delete existing tokens
  if (existingTokens.length > 0) {
    try {
      await db.verificationToken.deleteMany({ where: { email } });
      console.log(`Deleted all verification tokens for ${email}.`);
    } catch (error) {
      console.error(
        `Failed to delete verification tokens for ${email}:`,
        error
      );
    }
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
 */
export const updateVerificationToken = async (
  email: string,
  token: string
): Promise<VerificationToken> => {
  const code = generateOTP(); // Generate a 6-digit code
  const expires = generateExpirationDate(1); // 1 hour

  const existingToken = await getVerificationTokenByTokenAndEmail(token, email);

  const verificationToken = await db.verificationToken.update({
    where: { id: existingToken?.id },
    data: { code, expires },
  });

  return verificationToken;
};
