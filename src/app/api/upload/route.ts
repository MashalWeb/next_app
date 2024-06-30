
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

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
    console.log(file.path);
    
    try {
        await writeFile(path.join(process.cwd(), "public/uploads/" + fileName),buffer)

        //TODO take the local path and upload it on cloudinary and then remove from local storage
        return NextResponse.json({message: "Image Upload Successfully", filePath: `/public/uploads/${fileName}`}, {status: 200})
    } catch (error:any) {
        console.log("Upload Error: ", error);
        return NextResponse.json({message: error.message})
        
    }
}