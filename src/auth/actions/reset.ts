"use server";

import * as z from "zod";

import { ResetSchema } from "@/auth/schema";
import { getUserByEmail } from "@/auth/data/user";
import { sendPasswordResetEmail } from "@/lib/mail/auth";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;
  const lowerCaseEmail = email.toLowerCase();

  const existingUser = await getUserByEmail(lowerCaseEmail);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(lowerCaseEmail);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
}