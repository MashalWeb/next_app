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
function Dashboard() {
   // const router = useRouter();
   // const [admains, setAdmain] = useState([]);
   // const getAdmains = useCallback(async () => {
   //    const { data } = await axios.get("/api/dashboard");
   //    try {
   //       setAdmain(data?.Admains || []);
   //       console.log(admains);
   //    } catch (error: any) {
   //       console.log(error);
   //       toast.error(error.message);
   //    }
   // }, [setAdmain, toast]);

   // useEffect(() => {
   //    getAdmains();
   // }, [getAdmains]);
   // const [user, setuser] = useState({
   //    name: "",
   //    email: "",
   //    password: "",
   // });

   // const handleSubmit = async () => {
   //    try {
   //       const res = await axios.post("/api/sign-up", user);
   //       toast.success(" Admain Register Successful");
   //       router.replace("/Dashboard");
   //    } catch (error) {
   //       const AxiosError = error as AxiosError<any>;
   //       let errorMessage = AxiosError.response?.data.message;
   //       toast.error(errorMessage || "failed");
   //       console.log("error message: ", AxiosError.message);
   //    }
   // };
   // const handledelete = () => {};
   return (
      <>
         <div className="bg-gray-400 mx-6 mt-10 p-2 h-auto">
            <div className="bg-gray-200 flex align-bottom w-full">
               <div className="bg-red-100">
                  <h1 className="text-[30px]">
                     <span className="grd">Mashal Store </span>Dashboard
                  </h1>
                  <p className="para">
                     Manage your products, orders and much more ..
                  </p>
               </div>
               <div className="bg-red-300 h-10 flex align-middle justify-center gap-x-2">
                  <div>
                     <Link href={"/"} className="">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-7"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                           />
                        </svg>
                     </Link>
                  </div>
                  <div>
                     <Image
                        src={image}
                        alt="Profile image"
                        width={40}
                        height={40}
                        className="object-cover object-center rounded-full"
                     />
                  </div>
                  <div>
                     Hello <span className="grd">Mashal</span>
                  </div>
               </div>
            </div>
         </div>
         {/* <div className=" px-6 py-5 ">
            <div className="w-full bg-white/50 rounded px-5 flex justify-between p-2 py-3">
               <div className="info bg-white px-2 py-1 w-[180px] rounded-full shadow-lg">
                  <Image
                     src={nextimag}
                     alt="profile"
                     width={40}
                     className="border border-fuchsia-300 w-12 h-12 bg-white rounded-[50%] object-cover object-center inline-block"
                  />
                  <h3 className="inline-block ml-2">
                     Hello, {useSession().data?.user.name}
                  </h3>
               </div>
               <div className="bg-white ml-4 gap-2 px-2 py-1 w-[180px] rounded-full shadow-lg flex align-middle justify-center">
                  
                  
               </div>
            </div>
            <div className="bg-white w-full mt-7 p-2 rounded-xl">
               <h1 className="mb-3">Register New Admains</h1>
               <form
                  onSubmit={(e) => e.preventDefault()}
                  className=" mt-2 p-1 flex flex-row flex-wrap w-ful align-middle"
               >
                  <div className=" flex flex-row flex-wrap gap-x-5 gap-y-2 flex-shrink align-middle justify-start ">
                     <div className="flex flex-col">
                        <label className="mx-[2px] text-gray-500 mb-1">
                           Name
                        </label>
                        <input
                           className="px-3 outline-none py-2 rounded w-[250px] text-[14px] border-[1px] border-violet-200 focus:border-[1px] focus:border-violet-500 transition-all"
                           type="text"
                           placeholder="Name"
                           name="name"
                           value={user.name}
                           onChange={(e) =>
                              setuser({ ...user, name: e.target.value })
                           }
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="mx-[2px] text-gray-500 mb-1">
                           Email
                        </label>
                        <input
                           className="px-3 outline-none py-2 rounded w-[250px] text-[14px] border-[1px] border-violet-200 focus:border-[1px] focus:border-violet-500 transition-all"
                           type="email"
                           placeholder="email"
                           name="email"
                           value={user.email}
                           onChange={(e) =>
                              setuser({ ...user, email: e.target.value })
                           }
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="mx-[2px] text-gray-500 mb-1">
                           Password
                        </label>
                        <input
                           className="px-3 outline-none py-2 rounded w-[250px] text-[14px] border-[1px] border-violet-200 focus:border-[1px] focus:border-violet-500 transition-all"
                           type="password"
                           placeholder="password"
                           name="password"
                           value={user.password}
                           onChange={(e) =>
                              setuser({ ...user, password: e.target.value })
                           }
                        />
                     </div>
                  </div>
                  <div>
                     <button
                        className="bg-green-400 text-white px-3 outline-none py-2 rounded mt-[27px] mx-5"
                        type="submit"
                        onClick={handleSubmit}
                     >
                        Register
                     </button>
                  </div>
               </form>
            </div>
            <div className="w-full mt-3 bg-white rounded-xl p-2">
               <h1 className="mb-4">Admains List</h1>
               {admains.length > 0 ? (
                  admains.map((admain: any, i) => (
                     <AdmainCards
                        email={admain?.email}
                        name={admain?.name}
                        key={admain?._id}
                        onDelete={handledelete}
                     />
                  ))
               ) : (
                  <p>No Admains</p>
               )}
            </div>
         </div> */}
         <div className="flex w-full flex-row">
            <Charts name="line" />
         </div>
      </>
   );
}

export default Dashboard;
