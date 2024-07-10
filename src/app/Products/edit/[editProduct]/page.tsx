"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function Page() {
   const [product, setproduct] = useState([]);
   const param = useParams();
   useEffect(() => {
      fetchProduct();
   }, [param.editProduct]);

   const fetchProduct = async () => {
      const { data } = await axios.get("/api/products");
      setproduct(data?.products);
   };

   console.log("Param: ", param.editProduct);
   return (
      <div>
         <h1>Hello there: </h1>
         {product.length > 0 ? (
            product.map((prd: any) => (
               <div key={prd._id} className="p-3 bg-gray-500">
                  {prd.productName}
               </div>
            ))
         ) : (
            <p>No Products</p>
         )}
         <div></div>
      </div>
   );
}

export default Page;
