import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

export default async function uploadOnCloudinary(localpath:string) {
    try {
        cloudinary.config({
            api_key: "438652911353886",
            api_secret: "VV8TXoLfXGj84fCa2w5gPcLFhyU",
            cloud_name: "doxmrrizw"  
        })

        if(!localpath){
            throw new Error("No LocalPath is given")

        }
        const res =  await cloudinary.uploader.upload(localpath, { resource_type: "auto"})
        fs.unlinkSync(localpath)
        return res.url

    } catch (error:any) {
        console.log("Upload_ERROR", error);
        fs.unlinkSync(localpath)
        return {error: error.message}       
    }

}