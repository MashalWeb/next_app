import { NextAuthOptions } from "next-auth";
import connection from "@/lib/dbConnection";
import bcrypt from "bcryptjs";
import Admain from "@/models/user.model";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const authOptions: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         id: "credentials",
         name: "Credentials",
         credentials: {
            email: {
               label: "Email Address",
               type: "email",
               placeholder: "e.g example@gmail.com",
            },
            password: { label: "Password", type: "Password" },
         },

         async authorize(credentials: any): Promise<any> {
            await connection();
            var token: any;
            try {
               const user = await Admain.findOne({
                  email: credentials?.email,
               });

               if (!user)
                  throw new Error("User Dose Not Exist With This Email");

               const isPasswordCorrect = await bcrypt.compare(
                  credentials.password,
                  user.password
               );
               console.log("Checking password success");
               if (!isPasswordCorrect) {
                  throw new Error("Passowrd is Incorrect");
               } else {
                  token = jwt.sign(
                     { _id: user?._id },
                     process.env.JWT_SECRET_KEY!
                  );
                  NextResponse.json({ message: "login success" }).cookies.set(
                     "tokan",
                     token,
                     { httpOnly: true }
                  );
                  return user;
               }
            } catch (error: any) {
               console.log("LOGIN_ERR :: ", error);
               throw Error(error);
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token._id = user._id?.toString();
         }
         return token;
      },
      async session({ session, token }) {
         if (token) {
            session.user._id = token._id;
         }
         return session;
      },
   },
   pages: {
      signIn: "/sign-in",
   },
   session: {
      strategy: "jwt",
   },
   secret: process.env.AUTH_SECRET_KEY,
};
