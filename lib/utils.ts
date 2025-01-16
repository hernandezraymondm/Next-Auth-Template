import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

/**
 * Combines class names using clsx and tailwind-merge.
 *
 * @param {...ClassValue[]} inputs - The class values to combine.
 * @returns {string} The combined class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Parses a server action response by stringifying and parsing the input.
 *
 * @param {T} response - The response to parse.
 * @returns {T} The parsed response.
 */
export function parseServerActionResponse<T>(response: T): T {
  return JSON.parse(JSON.stringify(response));
}

/**
 * Formats a date string into a localized date string in "en-PH" format.
 *
 * @param {string} date - The date string to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats a date string into a localized date and time string in "en-PH" format.
 *
 * @param {string} date - The date string to format.
 * @returns {string} The formatted date and time string.
 */
export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Adds a small delay to prevent timing attacks.
 *
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
export async function delayWithHash(): Promise<void> {
  await bcrypt.hash("timingAttackPrevention", 10);
}
