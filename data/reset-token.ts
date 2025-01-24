import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

/**
 * @One
 * Retrieves a password reset token by its token value.
 */
export const getPasswordResetTokenByToken = async (
  token: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * @Many
 * Retrieves all password reset tokens for a given email.
 */
export const getPasswordResetTokensByEmail = async (
  email: string
): Promise<PasswordResetToken[]> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findMany({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * @One
 * Retrieves a password reset token by token and code.
 */
export const getPasswordResetTokenByTokenAndCode = async (
  token: string,
  code: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { token, code },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * @One
 * Retrieves a password reset token by token and email.
 */
export const getPasswordResetTokenByTokenAndEmail = async (
  token: string,
  email: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { email, token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * @One
 * Will probably be unused
 * Retrieves a password reset token by email
 */
export const getPasswordResetTokenByEmail = async (
  email: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
