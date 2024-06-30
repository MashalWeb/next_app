import mongoose, { Schema } from "mongoose";

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
