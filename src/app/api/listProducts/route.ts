import connection from "@/lib/dbConnection";
import productModel from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  await connection();
    const {searchParams} = new URL(req.url)
    if (searchParams.size <=0) {
        return NextResponse.json({
            message: "Query is missing",
            success: false,
        },{status: 404})
    }
    const productLimit:any = searchParams.get("limit");
    const limit = Number(productLimit!);
    try {
       
        const products = await productModel.aggregate([
            {
              '$lookup': {
                'from': 'categories', 
                'localField': 'category', 
                'foreignField': '_id', 
                'as': 'categoryInfo'
              }
            }, {
              '$lookup': {
                'from': 'admains', 
                'localField': 'addedBy', 
                'foreignField': '_id', 
                'as': 'userInfo'
              }
            }, {
              '$project': {
                'productName': 1, 
                'productDescription': 1, 
                'price': 1, 
                'stock': 1, 
                'Images': 1, 
                'categoryInfo': 1, 
                'userInfo': 1, 
                'properties': 1, 
                'createdAt': 1
              }
            }, {
              '$limit': limit
            }, {
              '$sort': {
                'createdAt': -1
              }
            }
          ])
        return NextResponse.json({
            message: "Product Fetch Successfully",
            success: true,
            products: products,
            limit: limit
        }, {status: 200})
    } catch (error:any) {
        return NextResponse.json({
            message: error.message || "Something Went Wrong",
            success: true,
        }, {status: 500})
    }
}