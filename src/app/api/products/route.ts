import { NextRequest , NextResponse } from "next/server";
import productModel from "@/models/product.model";
import connection from "@/lib/dbConnection";
import Category from "@/models/category.model";


// create product handler
export async function POST(req:NextRequest) {
    await connection();

    const {productName,productDescription,price,Images,category,properties,stock,addedBy} = await req.json()
    
    if([
        productDescription ,
        productName , 
        price , 
        category , 
        stock , 
        addedBy].some((field) => field === "")
    ){
        return NextResponse.json({
            message: `Some Fields Are Missing`,
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
    console.log("Herer")
    return NextResponse.json({
        message: "New Product Created Successfully",
        success: true,
        Product: Product
    },{status: 201})
}


export async function GET(req:NextRequest) {
    await connection();
    const latestProducts = await productModel.aggregate([
        {
          '$lookup': {
            'from': 'admains', 
            'localField': 'addedBy', 
            'foreignField': '_id', 
            'as': 'user'
          }
        }, {
          '$sort': {
            'createdAt': -1
          }
        }, {
          '$limit': 3
        }, {
          '$project': {
            'productName': 1, 
            'stock': 1, 
            'createdAt': 1, 
            'user': 1
          }
        }
      ])
    const allProducts = await productModel.aggregate([
        {
          '$lookup': {
            'from': 'categories', 
            'localField': 'category', 
            'foreignField': '_id', 
            'as': 'productCategory'
          }
        }, {
          '$lookup': {
            'from': 'admains', 
            'localField': 'addedBy', 
            'foreignField': '_id', 
            'as': 'user'
          }
        }, {
          '$sort': {
            'createdAt': -1
          }
        }, {
          '$limit': 3
        }, {
          '$project': {
            'productName': 1, 
            'stock': 1, 
            'createdAt': 1, 
            'user': 1, 
            'price': 1, 
            'productCategory': 1, 
            'Images': 1
          }
        }
      ])
    
    return NextResponse.json({
        message: "Products Fetch Successfully",
        allProducts: allProducts,
        latestProducts: latestProducts
    }, {status: 200})
}


// delete handler
export async function DELETE(req:NextRequest) {
    await connection();
    const {searchParams} = new URL(req.url)
    const params = {
        productID: searchParams.get("productID")
    }

    if(!params.productID){
        return NextResponse.json({
            message: "Product Not found to be delete",
            success: false,
        },{status: 404})
    }

    try {
        await productModel.findByIdAndDelete({_id: params.productID})
        return  NextResponse.json({
            message: "Product Delete Successfully",
            success: true,
        },{status: 202})    
    } catch (error:any) {
        return NextResponse.json({
            message: `Unexpected Error ${error.message}`,
            success: false,
            
        },{status: 500})       
    }
}


