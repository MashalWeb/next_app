"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
export default function SignInForm() {
   const router = useRouter();
   const [email, setEmai] = useState("");
   const [passowrd, setPassword] = useState("");

   const onSubmit = async () => {
      const result = await signIn("credentials", {
         redirect: false,
         email: email,
         password: passowrd,
      });

      if (result?.error) {
         toast.error(`${result.error}`);
         setEmai("");
         setPassword("");
      }

      if (result?.url) {
         router.replace("/Dashboard");
         toast.success("Login Successfully");
      }
   };

   return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-50">
         <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
            <div className="text-center">
               <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                  Admain Login
               </h1>
               <p className="mb-4">
                  Sign in to continue your secret conversations
               </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
               <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="px-4 py-3 text-gray-700 placeholder-gray-500 text-base rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300"
                  onChange={(e) => setEmai(e.target.value)}
               />
               <input
                  name="password"
                  type="password"
                  value={passowrd}
                  placeholder="Password"
                  className=" px-4 py-3 text-gray-700 placeholder-gray-500 text-base rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 "
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button
                  className="bg-gradient-to-r from-rose-100 to-teal-50 w-full py-3"
                  onClick={onSubmit}
               >
                  Sign In
               </button>
            </form>

            <div className="text-center mt-4">
               <p>
                  Not a member yet?{" "}
                  <Link
                     href="/sign-up"
                     className="text-blue-600 hover:text-blue-800"
                  >
                     Sign up
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}
