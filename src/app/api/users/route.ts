import connection from "@/lib/dbConnection";
import Admain from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    await connection();
    try {
        const admains = await Admain.find({}).select(['-password', '-updatedAt']);
        return NextResponse.json({
            message: "Admains Fetch Successfully",
            success: true,
            admains: admains
        })
    } catch (error:any) {
        return NextResponse.json({
            message: error.message || "Something Went Wrong",
            success: false,
        })
    }
}

export async function DELETE(req:NextRequest) {
    await connection();
    const {searchParams} = new URL(req.url)
    const deleteID = searchParams.get("deleteID");

    if(!deleteID) return NextResponse.json({message: "no id is recived", success: false}, {status: 404})
    
    try {
        const deleteDoc = await Admain.findByIdAndDelete({_id: deleteID})

        if(deleteDoc){
            return NextResponse.json({message: "Admain Delete Successfully", success: true}, {status: 200})
        }
    } catch (error:any) {
        return NextResponse.json({message: error.message || "Something Went Wrong in Deletion", success: false}, {status:500})
    }
}

