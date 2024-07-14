"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import nextimag from "@/components/profileimg.jpg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import AdmainCards from "@/components/AdmainCards";
import { useRouter } from "next/navigation";
import image from "@/components/profileimg.jpg";
import { Charts } from "@/components/Carts";
import {
   BaggageClaimIcon,
   BarChart4,
   BarChart4Icon,
   BarChartBig,
   Box,
   CalendarClockIcon,
   DollarSign,
   LucideBaggageClaim,
   LucideCreditCard,
   ShoppingBag,
   ShoppingBasket,
   ShoppingCartIcon,
   User2Icon,
   UserCheck2Icon,
   WalletMinimal,
} from "lucide-react";

function Dashboard() {
   return (
      <div className="p-1 main ml-5 mr-5 mt-3 w-auto ">
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
            <div className="flex mb-7 flex-wrap justify-evenly gap-2 items-start">
               <div className="p-4 bg-white cus-shad rounded-xl w-[200px] flex justify-between items-center transition-all hover:-translate-y-1">
                  <div>
                     <h3>Today's Sales</h3>
                     <p>
                        13220.4 <span className="grd">PKR</span>
                     </p>
                  </div>
                  <div className="p-[6px] bg-grd rounded-lg cus-shad">
                     <DollarSign
                        className="stroke-white drop-shadow"
                        size={30}
                     />
                  </div>
               </div>
               <div className="p-4 bg-white cus-shad rounded-xl w-[212px] flex justify-between items-center transition-all hover:-translate-y-1">
                  <div>
                     <h3>Montly Sales</h3>
                     <p className="b-para">
                        145230.32 <span className="grd">PKR</span>
                     </p>
                  </div>
                  <div className="p-[6px] bg-grd rounded-lg cus-shad">
                     <BarChart4
                        className="stroke-white drop-shadow"
                        size={30}
                     />
                  </div>
               </div>
               <div className="p-4 bg-white cus-shad rounded-xl w-[212px] flex justify-between items-center transition-all hover:-translate-y-1">
                  <div>
                     <h3>Total Orders</h3>
                     <p>543</p>
                  </div>
                  <div className="p-[6px] bg-grd rounded-lg cus-shad">
                     <BaggageClaimIcon
                        className="stroke-white drop-shadow"
                        size={30}
                     />
                  </div>
               </div>
               <div className="p-4 bg-white cus-shad rounded-xl w-[212px] flex justify-between items-center transition-all hover:-translate-y-1">
                  <div>
                     <h3>Total Users</h3>
                     <p>362</p>
                  </div>
                  <div className="p-[6px] bg-grd rounded-lg cus-shad">
                     <UserCheck2Icon
                        className="stroke-white drop-shadow"
                        size={30}
                     />
                  </div>
               </div>
            </div>
            <div className="flex justify-center gap-8 items-center flex-wrap ">
               <div className="bg-white p-2 rounded-2xl sam-shad">
                  <h2 className="text-center mt-2 mb-3 text-black">
                     Montly Sales In Thousands
                  </h2>
                  <Charts name="bar" />
               </div>
               <div className="bg-white p-2 rounded-2xl sam-shad">
                  <h2 className="text-center mt-2 mb-3 text-black">
                     Daily Product Sales
                  </h2>
                  <Charts name="line" />
               </div>
            </div>
            <div className="mt-7 bg-white mx-9 p-4 rounded-2xl cus-shad">
               <div>
                  <h2>Latest Orders</h2>
                  <p className="para">Manage Your Latest Orders From Here</p>
               </div>
               <div className="cus-shad p-3 rounded-md mt-4 flex flex-nowrap justify-center overflow-auto w-full gap-x-1">
                  <div className=" w-[220px] flex  justify-center items-center gap-x-2">
                     <CalendarClockIcon
                        className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                        size={30}
                     />
                     <h4>Date</h4>
                  </div>
                  <div className=" w-[190px] flex  justify-center items-center gap-x-2">
                     <LucideCreditCard
                        className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                        size={30}
                     />
                     <h4>Paid</h4>
                  </div>
                  <div className=" w-[350px] flex  justify-center items-center gap-x-2">
                     <User2Icon
                        className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                        size={30}
                     />
                     <h4>Recipient</h4>
                  </div>
                  <div className=" w-[350px] flex  justify-center items-center gap-x-2">
                     <ShoppingBag
                        className="cus-shad p-1 bg-grd stroke-white drop-shadow rounded-md"
                        size={30}
                     />
                     <h4>Products</h4>
                  </div>
               </div>
               <div className="cus-shad p-3 rounded-md mt-4 flex flex-nowrap justify-center items-center overflow-auto w-full gap-x-1">
                  <div className=" w-[220px] flex flex-col items-center justify-center">
                     <p className="sm-para">Friday, july 2024, 1:45 PM</p>
                  </div>
                  <div className=" w-[190px] flex flex-col items-center justify-center">
                     <button className="non">No</button>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">Yousaf Khan</p>
                     <p className="sm-para">yousaf5343@gmail.com</p>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">
                        HP Laptop Core i3 500 GB Hardisk{" "}
                        <span className="grd">X3</span>
                     </p>
                  </div>
               </div>
               <div className="cus-shad p-3 rounded-md mt-4 flex flex-nowrap justify-center items-center overflow-auto w-full gap-x-1">
                  <div className=" w-[220px] flex flex-col items-center justify-center">
                     <p className="sm-para">Sunday, jun 2024, 11:45 AM</p>
                  </div>
                  <div className=" w-[190px] flex flex-col items-center justify-center">
                     <button className="succ">Yes</button>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">Hassan Khan</p>
                     <p className="sm-para">hassangk432@gmail.com</p>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">
                        IPhone XR Black 256 GB Ram{" "}
                        <span className="grd">X1</span>
                     </p>
                  </div>
               </div>
               <div className="cus-shad p-3 rounded-md mt-4 flex flex-nowrap justify-center items-center overflow-auto w-full gap-x-1">
                  <div className=" w-[220px] flex flex-col items-center justify-center">
                     <p className="sm-para">Tuesday, jan 2024, 5:15 PM</p>
                  </div>
                  <div className=" w-[190px] flex flex-col items-center justify-center">
                     <button className="non">No</button>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">Jamil Khan</p>
                     <p className="sm-para">jamil32s@gmail.com</p>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">
                        Golden Parel Cream <span className="grd">X6</span>
                     </p>
                  </div>
               </div>
               <div className="cus-shad p-3 rounded-md mt-4 flex flex-nowrap justify-center items-center overflow-auto w-full gap-x-1">
                  <div className=" w-[220px] flex flex-col items-center justify-center">
                     <p className="sm-para">Sunday, April 2024, 1:55 PM</p>
                  </div>
                  <div className=" w-[190px] flex flex-col items-center justify-center">
                     <button className="succ">Yes</button>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">Abdullah Khan</p>
                     <p className="sm-para">Abdullah43@gmail.com</p>
                  </div>
                  <div className=" w-[350px] flex flex-col items-center justify-center">
                     <p className="sm-para">
                        Bata Shose Black Color <span className="grd">X2</span>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
