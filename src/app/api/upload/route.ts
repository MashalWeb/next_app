
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import uploadOnCloudinary from "@/services/cloudinary";

export async function POST(req:NextRequest) {
    const formData = await req.formData();

    const file:any = formData.get("mainImages")
    if(!file){
        return NextResponse.json({
            message: "No File is recived",
            success: false
        },{status: 404})
    }

    const buffer = Buffer.from(await file?.arrayBuffer())
    const fileName =  Date.now() + file.name;
    
    try {
         await writeFile(path.join(process.cwd(), "public/uploads/" + fileName),buffer)
        const res = await uploadOnCloudinary(`${path.resolve(path.join())}/public/uploads/${fileName}`)
        
        console.log(res);
        if(res){
            return NextResponse.json({message: "Image Upload Successfully", filePath: res}, {status: 200})
        }
        //TODO take the local path and upload it on cloudinary and then remove from local storage
        console.log("some hdvbdflij");
        
    } catch (error:any) {
        console.log("Upload Error: ", error);
        return NextResponse.json({message: error.message})
        
    }
}