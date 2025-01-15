import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  /**
   * - Defines custom pages for sign-in and error handling
   * @property {string} signIn - Custom sign-in page path
   * @property {string} error - Custom error page path
   */
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  /**
   * Event callback triggered when a new account
   * in a given provider is linked to a user.
   * This callback automatically verifies the user's email by
   * setting `emailVerified` to the current date.
   * @param {Object} user - The user object
   */
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    /**
     * Session callback to extend session object
     * with token object's id and role.
     * @param {Object} token - The token object
     * @param {Object} session - The session object
     * @returns {Object} The updated session object
     */
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },

    /**
     * JWT callback to include user role in the token object
     * @param {Object} token - The token object
     * @param {Object} user - The user object
     * @returns {Object} The updated token object
     */
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
