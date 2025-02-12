"use server";

import * as z from "zod";
import { db } from "../../lib/db";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "../schema";
import { getUserByEmail } from "../data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const lowerCaseEmail = email.toLowerCase();
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(lowerCaseEmail);

  if (existingUser) {
    if (existingUser.password) {
      return { error: "Email already in use!" };
    } else {
      await db.user.update({
        where: {
          email: lowerCaseEmail
        },
        data: {
          password: hashedPassword
        }
      })
    }
    return { success: "Account created successfully! <br> Click <a href='/auth/login' style='text-decoration: underline;'>here</a> to login"};
  }

  await db.user.create({
    data: {
      email: lowerCaseEmail,
      password: hashedPassword,
    },
  });

  return { success: "Account created successfully! <br> Click <a href='/auth/login' style='text-decoration: underline;'>here</a> to login"};
};



