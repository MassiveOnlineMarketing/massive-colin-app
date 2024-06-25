import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  customField?: string;


  refreshToken?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    email?: string;

    accessToken?: string;
    refreshToken?: string;
  }
}