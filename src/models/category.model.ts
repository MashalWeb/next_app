import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
   {
      name: { type: String, require: true },
      Properties: [{type: Object, required: true, default: {}}],
   },
   { timestamps: true }
);

const Category =
   mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
 