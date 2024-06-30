import Category from "@/models/category.model";
import connection from "@/lib/dbConnection";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req:NextRequest){
    await connection()
    const {categoryName} = await req.json();
    try {
        if(!categoryName){
            return NextResponse.json({
                success: false,
                message: "Name is Required"
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
        categories: (await Category.find({})).map((val) => val)
    }, {status: 200})
}


export async function PUT(req: NextRequest){
    await connection()
    const {id, categoryName} = await req.json()

    if(!id) return NextResponse.json({
        message: "not found"
    })
    
    await Category.findByIdAndUpdate({_id: id}, {name: categoryName}, {new: true})
    return NextResponse.json({
        message: "Category Updated Successfully",
        success: true
    }, {status: 202})
}


export async function DELETE( req:NextRequest) {
    const {searchParams} = new URL(req.url);
    const params ={
        deleteID: searchParams.get("deleteID")
    }

    const {deleteID} = params;
    if(!deleteID) return NextResponse.json({message: "Not Found"})
    
    await Category.findByIdAndDelete({_id: deleteID},{new: true})

    return NextResponse.json({
        success: true,
        message: "category delete successfully"
    }, {status: 202})
}