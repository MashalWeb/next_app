import mongoose, { Schema, model } from "mongoose";

const admainSchema = new Schema(
   {
      name: {
         type: String,
         require: true,
      },
      email: {
         type: String,
         require: true,
      },
      password: {
         type: String,
         require: true,
      },
      salt: String,
   },
   { timestamps: true }
);

const Admain = mongoose.models.Admain || model("Admain", admainSchema);

export default Admain;
