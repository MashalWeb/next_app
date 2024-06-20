import mongoose from "mongoose";

export default async function connection() {
   await mongoose
      .connect(String(process.env.MONGO_URI))
      .then((res) => console.log("MongoDB Connected ⚙⚙", res.connection.name))
      .catch((err) => {
         console.log("CONNECTIONS_ERROR :: ", err);
         process.exit(1);
      });
}
