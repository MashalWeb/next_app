import mongoose, { Mongoose, Schema } from "mongoose"; 
export interface porductProps  {
   _id:any;
   productName: String;
   productDescription: String;
   price: String;
   Images: Array<Object>;
   category:mongoose.Types.ObjectId;
   properties:Object;
   stock:String;
   addedBy:mongoose.Types.ObjectId;
}
const productSchema = new Schema(
   {
      productName: {
         type: String,
         require: true,
      },
      productDescription: {
         type: String,
         require: true 
      },
      price: { 
         type: String, 
         require: true 
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
         require: true
      },
      addedBy: {
         type: mongoose.Types.ObjectId,
         ref: "Admain"
      }
   },
   { timestamps: true }
);

const productModel =
   mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
