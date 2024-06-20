import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function AddProducts() {
   return (
      <>
         <Header />
         <div className=" ml-[250px] px-6 py-5 ">
            <h1 className="m-y-4">Add Product</h1>
            <form action="">
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Product Name</label>
                  <Input type="text" placeholder="Product Name" />
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Desciption</label>
                  <Input type="text" placeholder="Product Desciption" />
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Category</label>
                  <select
                     name="Category"
                     id=""
                     className="block w-full px-1 py-2 mt-1 rounded-md border border-gray-200"
                  >
                     <option value="None">None</option>
                     <option value="Phone">Phone</option>
                     <option value="Laptops">Laptops</option>
                     <option value="IPads">IPads</option>
                  </select>
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Upload Images</label>
                  <Input type="file" />
               </div>
               <div className="sm:w-[600px] w-full mt-3 flex flex-row gap-2 flex-wrap align-middle justify-start">
                  <div className="shadow w-28 h-28 bg-white rounded-xl"></div>
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Price in PKR</label>
                  <Input type="number" placeholder="Product Price" />
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <Button className="bg-green-400" type="submit">
                     Add Product
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}

export default AddProducts;
