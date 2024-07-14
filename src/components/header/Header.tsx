"use client";
import {
   Boxes,
   LucideClipboardSignature,
   LucideLayoutDashboard,
   Settings,
   ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
   const activeLink = `cus-shad grd transition-all rounded-xl`;

   const pathname = usePathname();

   return (
      <>
         <div className="sidebar s-sh hidden sm:block rounded-r-[20px]">
            <Link
               href={"/Dashboard"}
               className="w-full flex align-middle justify-startmt-5 py-6"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-9"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
               </svg>
               <h2 className="mt-[2px] text-[20px] font-semibold">
                  Store Admain
               </h2>
            </Link>
            <Link
               href={"/Dashboard"}
               className={`w-full flex  align-middle pl-10 justify-start text-gray-500 py-4 transition-all  ${
                  pathname.startsWith("/Dashboard") ? activeLink : ""
               }`}
            >
               <LucideLayoutDashboard
                  className={
                     pathname.includes("/Dashboard") ? "grd-ico mr-3" : "mr-3"
                  }
               />

               <h2 className="mt-[2px] text-[17px] font-medium">Dashboard</h2>
            </Link>
            <Link
               href={"/Products"}
               className={`w-full flex  align-middle pl-10 justify-start text-gray-500 py-4 transition-all  ${
                  pathname.startsWith("/Products") ? activeLink : ""
               }`}
            >
               <Boxes
                  className={
                     pathname.includes("/Products") ? "grd-ico mr-3" : "mr-3"
                  }
               />

               <h2 className="mt-[2px] text-[17px] font-medium">Products</h2>
            </Link>
            <Link
               href={"/Categories"}
               className={`w-full flex  align-middle pl-10 justify-start text-gray-500 py-4 transition-all  ${
                  pathname.startsWith("/Categories") ? activeLink : ""
               }`}
            >
               <LucideClipboardSignature
                  className={
                     pathname.includes("/Categories") ? "grd-ico mr-3" : "mr-3"
                  }
               />

               <h2 className="mt-[2px] text-[17px] font-medium">Categories</h2>
            </Link>
            <Link
               href={"/Orders"}
               className={`w-full flex  align-middle pl-10 justify-start text-gray-500 py-4 transition-all  ${
                  pathname.startsWith("/Orders") ? activeLink : ""
               }`}
            >
               <ShoppingCart
                  className={
                     pathname.includes("/Orders") ? "grd-ico mr-3" : "mr-3"
                  }
               />

               <h2 className="mt-[2px] text-[17px] font-medium">Orders</h2>
            </Link>
            <Link
               href={"/Setting"}
               className={`w-full flex  align-middle pl-10 justify-start text-gray-500 py-4 transition-all  ${
                  pathname.startsWith("/Setting") ? activeLink : ""
               }`}
            >
               <Settings
                  className={
                     pathname.includes("/Setting") ? "grd-ico mr-3" : "mr-3"
                  }
               />
               <h2 className="mt-[2px] text-[17px] font-medium">Setting</h2>
            </Link>
         </div>
      </>
   );
}

export default Header;
