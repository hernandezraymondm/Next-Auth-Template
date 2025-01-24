import { VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";

/**
 * @One
 * Retrieves a verification token by its token value.
 */
export const getVerificationTokenByToken = async (
  token: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * @Many
 * Retrieves all verification tokens for a given email.
 */
export const getVerificationTokensByEmail = async (
  email: string
): Promise<VerificationToken[]> => {
  try {
    const verificationTokens = await db.verificationToken.findMany({
      where: { email },
    });
    return verificationTokens;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * @One
 * Retrieves a verification token by token and code.
 */
export const getVerificationTokenByTokenAndCode = async (
  token: string,
  code: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { token, code },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * @One
 * Retrieves a verification token by token and email.
 */
export const getVerificationTokenByTokenAndEmail = async (
  token: string,
  email: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { email, token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
