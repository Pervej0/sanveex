import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

import { compare } from "bcryptjs";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            return null;
          }

          // Check if password exists for user
          if (!existingUser.password) {
            return null;
          }

          // Check if password is correct
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password,
          );

          if (!passwordMatch) {
            return null;
          }

          // Return user object
          const user = {
            id: existingUser.id,
            name: `${existingUser.firstName} ${existingUser.lastName}`,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            phone: existingUser.phone,
            image: existingUser.image,
            email: existingUser.email,
            role: existingUser.role,
          };

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
};
