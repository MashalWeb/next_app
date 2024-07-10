"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
function Products() {
   const [products, setproducts] = useState([]);
   const [productId, setProductId] = useState("");
   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const res = await axios.get("/api/products");
         setproducts(res.data.products);
         console.log(products);
      } catch (error) {
         toast.error("Something went wrong, Refreash the page");
      }
   };

   const deleteProduct = async (productID: any) => {
      try {
         const res = await axios.delete("/api/products?productID=" + productID);
         toast.success(res.data.message || "Yes");
         fetchProducts();
      } catch (error) {
         const err = error as AxiosError<any>;
         toast.error(err.response?.data.message || "Something Went Wrong");
      }
   };
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
               {products.length > 0 &&
                  products.map((product: any, index: any) => (
                     <div
                        key={index}
                        className="w-[500px] gap-3 flex flex-row align-middle"
                     >
                        <Input
                           type="text"
                           disabled
                           value={product.productName}
                           className="text-black font-bold placeholder-input text-[20px]"
                        />
                        <Button className="bg-gray-600">
                           <Link href={`/Products/edit/${product._id}`}>
                              Edit
                           </Link>
                        </Button>
                        <Button
                           className="bg-red-400"
                           onClick={(ev) => deleteProduct(product._id)}
                        >
                           Delete
                        </Button>
                     </div>
                  ))}
            </div>
         </div>
      </>
   );
}

export default Products;
