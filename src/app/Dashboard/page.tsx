"use client";
import Header from "@/components/header/Header";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import nextimag from "@/components/profileimg.jpg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import AdmainCards from "@/components/AdmainCards";
import { useRouter } from "next/navigation";

function Dashboard() {
   const router = useRouter();
   const [admains, setAdmain] = useState([]);
   const getAdmains = useCallback(async () => {
      const { data } = await axios.get("/api/dashboard");
      try {
         setAdmain(data?.Admains || []);
         console.log(admains);
      } catch (error: any) {
         console.log(error);
         toast.error(error.message);
      }
   }, [setAdmain, toast]);

   useEffect(() => {
      getAdmains();
   }, [getAdmains]);
   const [user, setuser] = useState({
      name: "",
      email: "",
      password: "",
   });

   const handleSubmit = async () => {
      try {
         const res = await axios.post("/api/sign-up", user);
         toast.success(" Admain Register Successful");
         router.replace("/Dashboard");
      } catch (error) {
         const AxiosError = error as AxiosError<any>;
         let errorMessage = AxiosError.response?.data.message;
         toast.error(errorMessage || "failed");
         console.log("error message: ", AxiosError.message);
      }
   };
   const handledelete = () => {};
   return (
      <>
         <div className=" px-6 py-5 ">
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
                           d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                        />
                     </svg>
                  </Link>
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
                           d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                     </svg>
                  </Link>
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
         </div>
      </>
   );
}

export default Dashboard;
