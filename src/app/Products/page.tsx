import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
function Products() {
   return (
      <>
         <div className=" px-6 py-5 ">
            <h1>All Products</h1>
            <Link href="/Products/add" className="inline-block mt-4">
               <Button type="button" className="bg-green-400">
                  Add Products
               </Button>
            </Link>
            <h1 className="mt-4">Products List</h1>
            <div className="mt-4 w-full py-2 px-1 bg-white rounded-lg flex flex-col justify-start gap-y-2">
               <div className="w-[500px] gap-3 flex flex-row align-middle">
                  <Input
                     type="text"
                     disabled
                     value={"IPhone XR"}
                     className="text-black font-bold placeholder-input text-[20px]"
                  />
                  <Button className="bg-gray-600">Edit</Button>
                  <Button className="bg-red-400">Delete</Button>
               </div>
               <div className="w-[500px] gap-3 flex flex-row align-middle">
                  <Input
                     type="text"
                     disabled
                     value={"IPhone XR"}
                     className="text-black font-bold placeholder-input text-[20px]"
                  />
                  <Button className="bg-gray-600">Edit</Button>
                  <Button className="bg-red-400">Delete</Button>
               </div>
            </div>
         </div>
      </>
   );
}

export default Products;
