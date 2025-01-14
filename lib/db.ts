/**
 * @description
 * - Initializes a PrismaClient instance while managing hot-reloads in development.
 *
 * @issue
 * - Next.js hot-reloads can cause multiple PrismaClient instances to be created,
 *   leading to warnings about too many active clients.
 *
 * @solution
 * - Use a global variable to store the PrismaClient instance in development.
 * - This ensures only one instance is used across hot-reloads.
 *
 * @note
 * - `globalThis.prisma` is not affected by hot-reload.
 * - Hot-reload occurs only in development mode.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
