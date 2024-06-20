import mongoose, { Schema, mongo } from "mongoose";

const productSchema = new Schema(
   {
      productName: { type: String, require: true },
      description: String,
      price: { type: String, require: true },
      images: [{ type: String }],
      category: { type: mongoose.Types.ObjectId, ref: "Category" },
      properties: [{ type: Object }],
   },
   { timestamps: true }
);

const productModel =
   mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
