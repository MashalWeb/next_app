"use client";
import Image from "next/image";
import image from "@/components/profileimg.jpg";
import {
   CalendarCheck2Icon,
   Delete,
   DollarSign,
   Edit,
   ImageIcon,
   LucideCandlestickChart,
   LucideClipboardSignature,
   MoreHorizontal,
   Search,
   ShoppingBag,
   User,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
function Products() {
   const [allProducts, setallProducts] = useState([]);
   const [latestProducts, setlatestProducts] = useState([]);
   const [dilogBox, setDilogBox] = useState({
      status: false,
      productID: undefined,
   });
   useEffect(() => {
      getProducts();
   }, []);

   async function getProducts() {
      try {
         const { data } = await axios.get("/api/products");
         setallProducts(data?.allProducts);
         setlatestProducts(data?.latestProducts);
      } catch (error: any) {
         toast.error(
            error.message || "Something Went Wrong, Refresh The Page."
         );
      }
   }

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
         getProducts();
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
         <div className="bg w-full p-3 py-5 mt-4 rounded-2xl">
            <div className="flex flex-wrap justify-center gap-x-6 items-center w-full">
               <div className="rounded-2xl cus-shad p-3 py-6 bg-white basis-[46%] min-w-[350px] min-h-[262px]">
                  <div className="w-full rounded-[50px] px-3 py-2 cus-shad flex justify-between items-center border-[0.5px] border-gray-200">
                     <input
                        type="text"
                        placeholder="Search Your Products ..."
                        className="bg-none outline-none border-none basis-[90%] py-2 text-[18px] ml-1"
                        required
                     />
                     <div className="p-2 rounded-full bg-grd cursor-pointer cus-shad">
                        <Search
                           size={32}
                           className="drop-shadow stroke-white"
                        />
                     </div>
                  </div>
                  <div className="mt-[32px] flex flex-col items-center justify-center w-full">
                     <Link href={"/Products/add"} className="drop-shadow-sm ">
                        <button className="green w-[250px] font-medium text-[20px]">
                           Add New
                        </button>
                     </Link>

                     <button className="btn-grd w-[250px] font-medium text-[20px] mt-3">
                        List Products
                     </button>
                  </div>
               </div>
               <div className="w-full min-h-[262px] rounded-2xl cus-shad p-2 px-3 bg-white basis-[46%] min-w-[350px]">
                  <h2 className="text-center">Recently Added</h2>
                  <div className="flex flex-col justify-start items-start mt-2 gap-y-2">
                     {latestProducts.length > 0 &&
                        latestProducts.map((product: any) => (
                           <div
                              key={product._id}
                              className="p-2 bg-white cus-shad w-full rounded-md"
                           >
                              <div>
                                 <p className="text-[14px] capitalize">
                                    {product.productName}
                                    <span className="grd">
                                       {" "}
                                       X {product.stock}
                                    </span>{" "}
                                 </p>
                              </div>
                              <div className="w-full flex items-center justify-between mt-1">
                                 <div className="flex items-center gap-x-1">
                                    <div className="p-[2px] rounded-md bg-grd">
                                       <CalendarCheck2Icon
                                          className="stroke-white drop-shadow"
                                          size={20}
                                       />
                                    </div>
                                    <p className=" sm-para cus-gray">
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
                                    <p className=" sm-para cus-gray">
                                       By: {product.user[0].name}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        ))}
                  </div>
               </div>
            </div>
            <div className="w-full mt-4 px-[27px]">
               <div className="p-4 cus-shad rounded-2xl bg-white min-h-[300px]">
                  <h2 className="text-center">Product Details</h2>

                  <div className="cus-shad p-3 rounded-md mt-4 flex flex-nowrap justify-center overflow-auto w-full gap-x-1">
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
                  {allProducts.length > 0 &&
                     allProducts.map((product: any, index: number) => (
                        <div
                           key={index}
                           className="cus-shad px-3 py-2 rounded-md mt-4 flex flex-col w-full relative"
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
                                    {product.productCategory[0].name}
                                 </p>
                              </div>
                              <div className=" w-[180px]  flex  justify-center items-center gap-x-2">
                                 <p className="sm-para text-center">
                                    {product.stock}
                                 </p>
                              </div>
                              <div className=" w-[180px]  flex justify-center items-center gap-x-2">
                                 <p className="sm-para text-center">
                                    {product.price}{" "}
                                    <span className="grd">PKR</span>
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
                                       {product.user[0].name}
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
         </div>
      </div>
   );
}

export default Products;
