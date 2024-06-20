import Admain from "@/models/user.model";
import connection from "@/lib/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(Request: NextRequest) {
   await connection();

   try {
      const reqBody = await Request.json();
      const { name, email, password } = reqBody;

      const isUserExist = await Admain.findOne({
         name,
         email,
      });
      if (isUserExist) {
         return NextResponse.json(
            {
               message: " User With this Username or email Alerady Exist",
               success: false,
            },
            { status: 400 }
         );
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newAdmain = new Admain({
         name,
         email,
         password: hashPassword,
      });
      await newAdmain.save();
      return NextResponse.json(
         {
            message: "User Created Successfully",
            success: true,
            User: newAdmain._id,
         },
         {
            status: 200,
         }
      );
   } catch (error: any) {
      console.error("ERROR_REGISTRING_USER : ", error);
      return NextResponse.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
}
