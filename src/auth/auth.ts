import NextAuth, { Session } from "next-auth"
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "../lib/db";
import authConfig from "../../auth.config";
import { getUserById } from "./data/user";
import { ExtendedUser } from "../../next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {}
      })
    }
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, account }) {
      // console.log("jwt", { token, account })

      // add id to jwt
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      // Prevent sign in without email verification
      if (!existingUser) return token;

      // add role to jwt
      token.role = existingUser.role;

      // add customField to jwt
      token.customField = "test";

      return token;
    },
    // is available in auth()
    // TODO: Check why token is not working
    async session({ session, token }: any) {
      // console.log('session', { session, token })

      // add id to session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // add role to session
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // add customField to session
      // ! also set in next-auth.d.ts
      if (session.user) {
        session.user.customField = token.customField as string;
      }

      session.email = token.email;

      return session;
    },

  },
  ...authConfig,

});
