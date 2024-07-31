"use client";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import {
   CalendarCheck2Icon,
   Delete,
   DollarSign,
   Edit,
   ImageIcon,
   LucideCandlestickChart,
   LucideClipboardSignature,
   ShoppingBag,
   User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import image from "@/components/profileimg.jpg";

function ListAllProducts() {
   const ProductsPerPage = 5;
   const [prodcuts, setProducts]: any = useState([]);
   const [dilogBox, setDilogBox] = useState({
      status: false,
      productID: undefined,
   });
   useEffect(() => {
      fetchProducts();
   }, [ProductsPerPage]);

   const fetchProducts = async () => {
      try {
         const { data } = await axios.get(
            `/api/listProducts?limit=${ProductsPerPage}`
         );
         if (data) {
            setProducts(data.products);
         }
      } catch (error: any) {
         console.log("Error: ", error);
         toast.error(error.message || "Something Went Wrong");
      }
   };

   const handleDelete = async (productID: string) => {
      if (!productID) return;

      try {
         const response = await axios.delete(
            "/api/products?productID=" + productID
         );

         if (response.data?.success === true)
            toast.success(response.data?.message);
      } catch (error) {
         const err = error as AxiosError<any>;
         toast.error(err.response?.data?.message || "Something Went Wrong");
      } finally {
         fetchProducts();
         setDilogBox({ status: false, productID: undefined });
      }
   };
   return (
      <div className="p-1 main ml-5 mr-5 mt-3 w-auto relative">
         {dilogBox.status === true ? (
            <div className="w-full h-full z-50 fixed top-0 left-0 flex items-center justify-center ">
               <div className="w-[97%] h-[300px] bg-white bg-opacity-100 cus-shad rounded-2xl p-2 flex items-center justify-center gap-y-4 flex-col md:w-[600px]">
                  <h1 className="text-center text-[23px]">
                     Are You Sure To Delete This Product ?
                  </h1>
                  <div className="flex gap-x-3">
                     <button
                        className="bg-green px-8 py-2 rounded-md text-white cus-shad"
                        onClick={(e) => handleDelete(dilogBox.productID!)}
                     >
                        Yes
                     </button>
                     <button
                        className="red-grd px-8 py-2 rounded-md text-white cus-shad"
                        onClick={(ev) =>
                           setDilogBox({ productID: undefined, status: false })
                        }
                     >
                        No
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            ""
         )}
         <div className="bg w-full p-3 py-5 mt-4 rounded-2xl">
            <div className=" bg-white p-2 rounded-xl cus-shad">
               <h1 className="text-center">All Products List</h1>
            </div>

            <div className="sam-shad bg-white p-3 rounded-md mt-6 flex flex-nowrap justify-center overflow-auto w-full gap-x-1">
               <div className=" w-[190px]  flex justify-center items-center gap-x-2">
                  <ImageIcon
                     className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                     size={30}
                  />
                  <h4>Image</h4>
               </div>
               <div className=" w-[370px]  flex  justify-center items-center gap-x-2">
                  <ShoppingBag
                     className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                     size={30}
                  />
                  <h4>Product Name</h4>
               </div>
               <div className=" w-[200px]  flex  justify-center items-center gap-x-2">
                  <LucideClipboardSignature
                     className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                     size={30}
                  />
                  <h4>Category</h4>
               </div>
               <div className=" w-[180px]  flex  justify-center items-center gap-x-2">
                  <LucideCandlestickChart
                     className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                     size={30}
                  />
                  <h4>Stoke</h4>
               </div>
               <div className=" w-[180px]  flex  justify-center items-center gap-x-2 ">
                  <DollarSign
                     className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                     size={30}
                  />
                  <h4>Price</h4>
               </div>
            </div>

            {prodcuts.length > 0 &&
               prodcuts.map((product: any, index: number) => (
                  <div
                     key={index}
                     className="bg-white cus-shad px-3 py-2 rounded-md mt-4 flex flex-col w-full relative"
                  >
                     <div className="flex flex-nowrap justify-center w-full gap-x-1">
                        <div className=" w-[190px]  flex justify-center items-center gap-x-2">
                           <div className="bg-grd rounded-md w-[150px] h-[100px]">
                              <Image
                                 src={image}
                                 alt="product image"
                                 width={80}
                                 className="w-full h-full object-cover object-center rounded-md"
                              />
                           </div>
                        </div>
                        <div className=" w-[370px]  flex  justify-center items-center gap-x-2">
                           <p className="sm-para text-center">
                              {product.productName}
                           </p>
                        </div>
                        <div className=" w-[200px]  flex  justify-center items-center gap-x-2">
                           <p className="sm-para text-center">
                              {product.categoryInfo[0]?.name}
                           </p>
                        </div>
                        <div className=" w-[180px]  flex  justify-center items-center gap-x-2">
                           <p className="sm-para text-center">
                              {product.stock}
                           </p>
                        </div>
                        <div className=" w-[180px]  flex justify-center items-center gap-x-2">
                           <p className="sm-para text-center">
                              {product.price} <span className="grd">PKR</span>
                           </p>
                        </div>
                     </div>
                     <div className="mt-2 px-3 pt-1 w-full flex items-center justify-between border-t">
                        <div className="flex gap-x-3">
                           <div className="flex items-center gap-x-1">
                              <div className="p-[2px] rounded-md bg-grd">
                                 <CalendarCheck2Icon
                                    className="stroke-white drop-shadow"
                                    size={20}
                                 />
                              </div>
                              <p className=" text-[13px] cus-gray">
                                 {dayjs(product.createdAt).format(
                                    "MMM D, YYYY h:mm A"
                                 )}
                              </p>
                           </div>
                           <div className="flex items-center gap-x-1">
                              <div className="p-[2px] rounded-md bg-grd">
                                 <User
                                    className="stroke-white drop-shadow"
                                    size={20}
                                 />
                              </div>
                              <p className=" text-[13px] cus-gray">
                                 {product.userInfo[0].name}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-x-1">
                           <div
                              onClick={(ev) =>
                                 setDilogBox({
                                    productID: product._id!,
                                    status: true,
                                 })
                              }
                              className="cus-shad px-8 red-grd rounded-md cursor-pointer py-1 hover:saturate-150 transition-all"
                           >
                              <Delete className="drop-shadow stroke-white" />
                           </div>
                           <Link href={"/Products/edit/" + product._id}>
                              <div className="cus-shad px-8 bg-grd rounded-md cursor-pointer py-1 hover:saturate-150 transition-all">
                                 <Edit className="drop-shadow stroke-white" />
                              </div>
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
         </div>
      </div>
   );
}

export default ListAllProducts;
