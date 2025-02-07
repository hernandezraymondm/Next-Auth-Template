"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const userSession = await currentUser();

  if (!userSession) {
    return { error: "Unauthorized" };
  }

  if (userSession.provider !== "credentials") {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  const userStore = await getUserById(userSession.id);

  if (!userStore) {
    return { error: "Unauthorized" };
  }

  await db.user.update({ where: { id: userStore.id }, data: { ...values } });

  return { success: "Settings Updated!" };
};
