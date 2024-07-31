import productModel from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/dbConnection";

export async function POST(req:NextRequest) {
    await connection();

    const {productName} = await req.json();
    
    if (!productName) {
        return NextResponse.json({
            message: "Product ID Not Found",
            success: false,
        })
    }

    try {
        // remove other one which have 'isFeatureProduct: true'
        await productModel.findOneAndUpdate({isFeatureProduct: true}, {isFeatureProduct: false});

        // set new feature product
        const featureProduct = await productModel.findOneAndUpdate({productName: productName}, {isFeatureProduct: true}, {new: true})

        return NextResponse.json({
            message: "Feature Product set",
            success: true,
            featureProduct: featureProduct
        })
    } catch (error:any) {
        return NextResponse.json({
            message: error.message || "Something Went Wrong",
            success: false,
        })
    }
}

export async function GET(req:NextRequest){
    await connection();
    try {
        const featureProduct = await productModel.findOne(
            {
                isFeatureProduct: true
            }
        ).select(['productName'])

        return NextResponse.json({
            message: "feature product fetch successfully",
            success: true,
            featureProduct: featureProduct
        }, {status: 200})

    } catch (error:any) {
        
        return NextResponse.json({
            message: error.message || "Something went wrong",
            success: false,
        }, {status: 500})
    }
}