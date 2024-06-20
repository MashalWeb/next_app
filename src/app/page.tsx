"use client";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
   const [loging, setloging] = useState(false);
   const session = useSession();
   console.log(session.status);
   useEffect(() => {
      if (session.status === "loading") {
         setloging(true);
      } else {
         setloging(false);
      }
   }, [session.status]);
   if (session.status === "unauthenticated") {
      return (
         <div className="w-full h-max flex align-middle justify-center ">
            <div className="fixed top-3 bg-violet-500 p-5">
               {loging && "Loading"}
            </div>
            <div className="p-10 rounded-l mt-32 flex flex-col align-middle justify-center">
               <h1 className="text-[50px]  mb-5">WELCOME BACK</h1>
               <h2 className="font-semibold text-[20px] text-center">
                  Login Into Admain Panel
               </h2>

               <div className="flex align-middle justify-center">
                  <button className=" py-3 px-4 bg-gradient-to-r from-rose-100 to-teal-50 rounded-full mt-5 w-48 shadow-xl inline-block">
                     <Link href={"/sign-in"}>Login</Link>
                  </button>
               </div>
            </div>
         </div>
      );
   } else if (session.status === "authenticated") {
      return (
         <div className="w-full h-max flex align-middle justify-center ">
            <div className="fixed top-3 bg-violet-500 p-5">
               {loging && "Loading"}
            </div>
            <div className="p-10 rounded-l mt-32 flex flex-col align-middle justify-center">
               <h1 className="text-[50px]  mb-5">
                  WELCOME BACK {session.data?.user.name}
               </h1>
               <h2 className="font-semibold text-[20px] text-center">
                  Go To Dashboard
               </h2>

               <div className="flex align-middle justify-center">
                  <button className=" py-3 px-4 bg-gradient-to-r from-rose-100 to-teal-50 rounded-full mt-5 w-48 shadow-xl inline-block">
                     <Link href={"/Dashboard"}>Dashboard</Link>
                  </button>
               </div>
            </div>
         </div>
      );
   }
}
