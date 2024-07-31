
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
   return NextResponse.json({
      message: "Response From Dashboard Api Endpoint",
      success: true
   })
}
