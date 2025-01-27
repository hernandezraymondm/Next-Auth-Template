import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

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

/**
 * Generates a new UUID.
 *
 * @returns {string} - A newly generated UUID.
 */
export const generateUUID = (): string => {
  return uuidv4();
};

/**
 * Generates a random 6-digit verification code.
 *
 * @returns {string} - A 6-digit verification code.
 */
export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Generates an expiration date for the verification token.
 *
 * @param {number} hours - The number of hours until the token expires.
 * @returns {Date} - The expiration date.
 */
export const generateExpirationDate = (hours: number): Date => {
  return new Date(new Date().getTime() + hours * 3600 * 1000);
};

/**
 * Converts a date to milliseconds since the Unix Epoch (January 1, 1970).
 * @param {Date|string} date - The date to convert. It can be a Date object or a string.
 * @returns {number} The number of milliseconds since the Unix Epoch.
 */
export const dateToMilliseconds = (date: Date) => {
  // If the input is a string, convert it to a Date object
  const dateObject = typeof date === "string" ? new Date(date) : date;
  // Check if the dateObject is non-valid Date
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date format");
  }
  return dateObject.getTime();
};
