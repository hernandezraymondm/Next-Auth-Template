import { VerificationToken } from "@prisma/client";
import { db } from "@/lib/db";

/**
 * NOT IN USE BECAUSE WE CREATED A BATCH GET AND DELETE
 * Retrieves a verification token by the associated email address.
 *
 * @param {string} email - The email address to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the verification token object or null if not found.
 */
// export const getVerificationTokenByEmail = async (
//   email: string
// ): Promise<VerificationToken | null> => {
//   try {
//     const verificationToken = await db.verificationToken.findFirst({
//       where: { email },
//     });

//     return verificationToken;
//   } catch {
//     return null;
//   }
// };

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

/**
 * Retrieves a verification token by token and code.
 *
 * @param {string} email - The email value to search for.
 * @param {string} token - The token value to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the verification token object or null if not found.
 */
export const getVerificationTokenByEmailAndToken = async (
  email: string,
  token: string
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

/**
 * Retrieves all verification tokens for a given email.
 *
 * @param {string} email - The email address to search for.
 * @returns {Promise<VerificationToken[]>} - A promise that resolves to an array of verification tokens.
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
 * Deletes all verification tokens for a given email.
 *
 * @param {string} email - The email address to search for.
 */
export const deleteVerificationTokensByEmail = async (email: string) => {
  try {
    await db.verificationToken.deleteMany({ where: { email } });
    console.log(`Deleted all verification tokens for ${email}.`);
  } catch (error) {
    console.error(`Failed to delete verification tokens for ${email}:`, error);
  }
};
