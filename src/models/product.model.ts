import mongoose, { model, Schema } from "mongoose"; 
export interface porductProps  {
   _id:any;
   productName: String;
   productDescription: String;
   price: String;
   Images: Array<string>;
   category:mongoose.Types.ObjectId;
   properties:Object;
   stock:String;
   addedBy:mongoose.Types.ObjectId;
}
const productSchema = new Schema(
   {
      productName: {
         type: String,
         require: [true, "product Name required"],
      },
      productDescription: {
         type: String,
         require: [true, "product Description required"] 
      },
      price: { 
         type: String, 
         require: [true, "product price required"]
      },
      
      Images: [
         {
            type: String,  
         }
      ],
      category: { 
         type: mongoose.Types.ObjectId, 
         ref: "Category" 
      },
      properties: [
         { type: Object }
      ],
      stock: {
         type: Number, 
         require: [true, "product stock required"]
      },
      addedBy: {
         type: mongoose.Types.ObjectId,
         ref: "Admain"
      }
   },
   { timestamps: true }
);

const productModel =
   mongoose.models.Product || model("Product", productSchema);

export default productModel;
