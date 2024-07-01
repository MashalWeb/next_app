import { NextRequest , NextResponse } from "next/server";
import productModel from "@/models/product.model";
import connection from "@/lib/dbConnection";
import Category from "@/models/category.model";
import Products from "@/app/Products/page";

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
    const categoryName = await Category.findOne({name: category})
    if(!category){
        return NextResponse.json({
            message: "Category is missing",
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
        category: categoryName._id,
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


export async function GET(req:NextRequest) {
    return NextResponse.json({
        message: "Products Fetch Successfully",
        products: await productModel.find({},null, {sort: "createdAt"}).populate(["category", "addedBy"])
    }, {status: 200})
}