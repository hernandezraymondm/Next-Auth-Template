import { sendLockoutEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const loginAttempts = new Map<
  string,
  {
    attempts: number;
    lockoutUntil?: number;
    emailSent?: boolean;
    lastAttempt: number;
  }
>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const ATTEMPT_RESET_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds
const CLEANUP_INTERVAL = 10 * 60 * 1000; // Cleanup every 10 minutes

// Handle failed login attempts
export const handleFailedLogin = async (
  email: string,
  password: string,
  existingUser: any
) => {
  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    const now = Date.now();
    const userAttempts = loginAttempts.get(email) || {
      attempts: 0,
      lockoutUntil: undefined,
      emailSent: false,
      lastAttempt: now,
    };

    userAttempts.attempts += 1;
    userAttempts.lastAttempt = now;

    if (userAttempts.attempts >= MAX_ATTEMPTS) {
      userAttempts.lockoutUntil = now + LOCKOUT_DURATION;

      // Send lockout email only if not sent before (within 24 hours)
      if (!userAttempts.emailSent) {
        console.log("Lockout Email Sent!");

        await sendLockoutEmail(email);
        userAttempts.emailSent = true;
      }
    }

    loginAttempts.set(email, userAttempts);
    return { error: "Invalid credentials!" };
  }

  // Reset attempts on successful login
  loginAttempts.delete(email);
  return { success: true };
};

// Check if account is locked
export const checkLockoutStatus = (email: string) => {
  const userAttempts = loginAttempts.get(email);
  const now = Date.now();

  if (userAttempts?.lockoutUntil && userAttempts.lockoutUntil > now) {
    const remainingTime = Math.ceil((userAttempts.lockoutUntil - now) / 1000);
    return { locked: true, remainingTime };
  }

  return { locked: false, remainingTime: 0 };
};

// Check if the user's email is verified
export const checkEmailVerification = async (
  email: string,
  existingUser: any
) => {
  if (!existingUser.emailVerified) {
    return { error: "Please verify your email address!" };
  }
  return { success: true };
};

// Cleanup Task: Remove old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  loginAttempts.forEach((value, key) => {
    if (
      value.lockoutUntil &&
      value.lockoutUntil < now && // Remove expired lockouts
      value.lastAttempt &&
      now - value.lastAttempt > ATTEMPT_RESET_DURATION // Remove if no activity for 1 day
    ) {
      loginAttempts.delete(key);
    }
  });
}, CLEANUP_INTERVAL);
