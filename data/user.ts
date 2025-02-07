import { User } from "@prisma/client";
import { db } from "@/lib/db";

/**
 * Retrieves a user by their email address.
 *
 * @param {string} email - The email address to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the user object or null if not found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

/**
 * Retrieves a user by their ID.
 *
 * @param {string} id - The user ID to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the user object or null if not found.
 */
export const getUserById = async (
  id: string | undefined
): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
