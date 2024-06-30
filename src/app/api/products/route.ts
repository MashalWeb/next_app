import { NextRequest , NextResponse } from "next/server";
import productModel from "@/models/product.model";
import connection from "@/lib/dbConnection";

export async function POST(req:NextRequest) {
    await connection();
    console.log("scs");
    const {productName,productDescription,price,Images,category,properties,stock,addedBy} = await req.json()

    
    if ((productDescription || productName || price || category || stock || addedBy) === ""){
        return NextResponse.json({
            message: "Some Fields Are Missing",
            success: false
        })
    }

    if(Images?.length <= 0){
        return NextResponse.json({
            message: "Images Are Required",
            success: false
        })
    }
    if(properties?.length <= 0){
        return NextResponse.json({
            message: "Properties are Missing",
            success: false
        })
    }


    const Product = new productModel({
        Images,
        productDescription,
        productName,
        price,
        category,
        properties,
        stock,
        addedBy
    })

    await Product.save()

    return NextResponse.json({
        message: "New Product Created Successfully",
        success: true,
        Product
    })
}