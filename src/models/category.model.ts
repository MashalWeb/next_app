import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
   {
      name: { type: String, require: true },
      property: [{ type: String }],
   },
   { timestamps: true }
);

const Category =
   mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
