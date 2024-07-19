"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
   const session = useSession();
   const router = useRouter();
   const [isLogin, setIsLogin] = useState(false);

   const GetUser = useCallback(async () => {
      if (!session || session?.data?.user) {
         setIsLogin(false);
         router.push("/sign-in");
      } else {
         setIsLogin(true);
         router.push("/Dashboard");
      }
   }, [isLogin, session.status]);

   useEffect(() => {
      GetUser();
   }, [isLogin, GetUser, session?.data]);

   return session.status === "loading" ? (
      <p>Loding</p>
   ) : isLogin ? (
      <p>no</p>
   ) : (
      <p>yes</p>
   );
}
