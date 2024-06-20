import connection from "@/lib/dbConnection";
import Admain from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   await connection();
   const Admains = await Admain.find({}).select("-password");
   return NextResponse.json(
      {
         message: "data fetch successfully",
         Admains,
      },
      { status: 200 }
   );
}
