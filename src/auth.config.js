/* eslint-disable import/no-anonymous-default-export */
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const { identifier, password } = credentials;

        if (!identifier || !password) return null;

        let user;

        if (identifier.includes("@")) {
          user = await db.user.findUnique({
            where: { email: identifier },
          });
        } else {
          user = await db.user.findUnique({
            where: { id: identifier },
          });
        }

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
};
