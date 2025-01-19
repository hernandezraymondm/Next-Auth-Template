import { VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";

/**
 * Retrieves a verification token by the associated email address.
 *
 * @param {string} email - The email address to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the verification token object or null if not found.
 */
export const getVerificationTokenByEmail = async (
  email: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves a verification token by its token value.
 *
 * @param {string} token - The token value to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the verification token object or null if not found.
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
 * Retrieves a verification token by token and code.
 *
 * @param {string} token - The token value to search for.
 * @param {string} code - The code value to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the verification token object or null if not found.
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
