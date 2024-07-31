"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import image from "@/components/profileimg.jpg";
import Image from "next/image";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

function Page() {
   const [product, setproduct]: any = useState();
   const param = useParams();
   const productID = param.editProduct;

   useEffect(() => {
      fetchProduct();
   }, [productID]);

   const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products?productID=${productID}`);
      setproduct(data?.product);
      console.log("product", product);
   };

   return (
      <div className="p-1 main ml-5 mr-5 mt-3 w-auto">
         <div className="top w-full py-3 mt-2 flex justify-between items-center">
            <div>
               <h1>
                  <span className="grd">Mashal Store</span> Dashbard
               </h1>
               <p className="para -mt-[3px]">
                  Manage your products, orders and much more..
               </p>
            </div>
            <div className="flex gap-x-2 align-middle h-12 w-max">
               <div className="w-[47px] h-[47px] bg-gray-300 rounded-full overflow-hidden">
                  <Image
                     alt="profile image"
                     src={image}
                     width={47}
                     height={47}
                     className="object-cover object-center rounded-full"
                  />
               </div>
               <div className="rounded-3xl sam-shad bg-white w-[170px] flex items-center justify-center">
                  <p className="text-center">
                     Hello, <span className="grd">Mashal</span>
                  </p>
               </div>
            </div>
         </div>

         {/* from */}

         <div className="bg w-full p-3 py-5 mt-4 rounded-2xl min-h-[300px]">
            {product && <ProductForm {...product} />}
         </div>
      </div>
   );
}

export default Page;
