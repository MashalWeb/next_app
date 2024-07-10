"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
   const session = useSession();
   const router = useRouter();
   const [isLogin, setIsLogin] = useState(false);

   const GetUser = useCallback(async () => {
      if (session.status === "authenticated") {
         setIsLogin(true);
         router.push("/Dashboard");
      } else {
         setIsLogin(false);
         router.push("sign-in");
      }
   }, [isLogin, session.status]);

   useEffect(() => {
      GetUser();
   }, [isLogin, GetUser]);

   return session.status === "loading" ? (
      <p>Loding</p>
   ) : isLogin ? (
      <p>yes</p>
   ) : (
      <p>No</p>
   );
}
