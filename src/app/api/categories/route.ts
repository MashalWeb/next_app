import Category from "@/models/category.model";
import connection from "@/lib/dbConnection";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req:NextRequest){
    await connection()
    const {categoryName, Properties} = await req.json();
    try {
        if(!categoryName || Properties.length <0){
            return NextResponse.json({
                success: false,
                message: "All Fields are required"
            },{status:400})
        }
        const isAleradyExist = await Category.findOne({name: categoryName})
        if(isAleradyExist){
            return NextResponse.json({
                success: false,
                message: `Category With ${categoryName} Alerady Exist `
            }, {status: 400})
        }
        const newCategory = new Category({
            name: categoryName,
            Properties
        })
        await newCategory.save()

        return NextResponse.json({
            success: true,
            message: "New category created."
        },{status: 201})

        
    } catch (error) {
        console.log("CATEGORY_ERR : ", error);
        return NextResponse.json({
            success: false,
            message: "Unexpected error",
        },{status: 500})
        
    }

}

export async function GET(req: NextRequest){
    await connection()
    return NextResponse.json({
        success: true,
        categories: await Category.find({})
    }, {status: 200})
}