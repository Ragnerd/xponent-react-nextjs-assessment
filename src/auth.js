// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import { getUserById } from "./data/user";
// import { getAccountByUserId } from "./data/account";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "./lib/db";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   secret: process.env.AUTH_SECRET,
//   trustHost: true,
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//   },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() },
//       });
//     },
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // OAuth users (Google, GitHub) → always allowed
//       if (account?.provider !== "credentials") return true;

//       // Credentials login
//       // If user logged in using EMAIL → require verification
//       if (user.email && !user.emailVerified) {
//         return false;
//       }

//       // Username-based test takers → allow
//       return true;
//     },
//     async session({ session, token }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }

//       if (session.user) {
//         session.user.name = token.name;
//         session.user.email = token.email;
//         // expose role on session from JWT token
//         session.user.role = token.role ?? undefined;
//       }

//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;

//       const existingUser = await getUserById(token.sub);

//       if (!existingUser) return token;

//       const existingAccount = await getAccountByUserId(existingUser.id);

//       token.isOAuth = !!existingAccount;
//       token.name = existingUser.name;
//       token.email = existingUser.email;
//       // assign admin role for the configured admin email
//       token.role =
//         existingUser.email === "admin@example.com" ? "admin" : "user";

//       return token;
//     },
//   },
//   adapter: PrismaAdapter(db),
//   session: {
//     strategy: "jwt",
//   },
//   ...authConfig,
// });

import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  callbacks: {
    async signIn({ user, account }) {
      // OAuth → always allowed
      if (account?.provider !== "credentials") return true;
      // Admin user → must have verified email
      if (user.email === "admin@example.com" && !user.emailVerified) {
        return false;
      }
      // Candidates → always allowed
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;

        // ✅ ROLE DECISION
        token.role = user.email === "admin@example.com" ? "admin" : "candidate";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
