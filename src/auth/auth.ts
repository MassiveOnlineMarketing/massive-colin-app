import NextAuth, { Session } from "next-auth"
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "../lib/db";
import authConfig from "../../auth.config";
import { getUserById } from "./data/user";
import { ExtendedUser } from "../../next-auth";
import { updateGoogleRefreshToken } from "../lib/tokens";

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
        data: { }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // console.log('signIn', { user, account, })

      // Allow OAuth without email verification
      if (account?.provider !== "credentials") {
        // Store the refresh token
        if (account?.provider === "google" && account.refresh_token) {

          (user as ExtendedUser).refreshToken = account.refresh_token;

          // console.log("refresh token ", account.refresh_token)
          // Update the refresh token in the database
          // if (user.email) {
          //   await updateUserRefreshToken(user.email, account.refresh_token);
          // }
        }
        return true;
      }

      // only triggers when email has been used to create an account
      if (user.id) {
        const existingUser = await getUserById(user.id);


      }

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

      // add refersh and acces token to jwt --> Google login search console connection 
      if (account && account.refresh_token) {
        token.accesToken = account.access_token;
        token.refreshToken = account.refresh_token;
        await updateGoogleRefreshToken(token.sub, account.refresh_token);
      }
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

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.email = token.email;

      return session;
    },
    
  },
  ...authConfig,

});

// import NextAuth from "next-auth"
// import { UserRole } from "@prisma/client";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// import { db } from "@/lib/db";
// import authConfig from "@/auth.config";
// import { getUserById } from "@/data/user";
// import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
// import { getAccountByUserId } from "./data/account";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
//   update,
// } = NextAuth({
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//   },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() }
//       })
//     }
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // Allow OAuth without email verification
//       if (account?.provider !== "credentials") return true;

//       const existingUser = await getUserById(user.id);

//       // Prevent sign in without email verification
//       if (!existingUser?.emailVerified) return false;

//       if (existingUser.isTwoFactorEnabled) {
//         const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

//         if (!twoFactorConfirmation) return false;

//         // Delete two factor confirmation for next sign in
//         await db.twoFactorConfirmation.delete({
//           where: { id: twoFactorConfirmation.id }
//         });
//       }

//       return true;
//     },
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }

//       if (token.role && session.user) {
//         session.user.role = token.role as UserRole;
//       }

//       if (session.user) {
//         session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
//       }

//       if (session.user) {
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.isOAuth = token.isOAuth as boolean;
//       }

//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;

//       const existingUser = await getUserById(token.sub);

//       if (!existingUser) return token;

//       const existingAccount = await getAccountByUserId(
//         existingUser.id
//       );

//       token.isOAuth = !!existingAccount;
//       token.name = existingUser.name;
//       token.email = existingUser.email;
//       token.role = existingUser.role;
//       token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

//       return token;
//     }
//   },
//   adapter: PrismaAdapter(db),
//   session: { strategy: "jwt" },
//   ...authConfig,
// });