"use server";

import * as z from "zod";

import { LoginSchema } from "../schema";
import { signIn } from "@/auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/auth/data/user";


export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const lowerCaseEmail = email.toLowerCase();

  const existingUser = await getUserByEmail(lowerCaseEmail);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }


  try {
    await signIn("credentials", {
      lowerCaseEmail,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};