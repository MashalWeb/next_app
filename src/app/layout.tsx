import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header/Header";
export const metadata: Metadata = {
   title: "Ecommerce App",
   description: "Ecommerce App By Mashal Horara",
};
const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   style: "normal",
   display: "auto",
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <AuthProvider>
            <body className="bg-white">
               <div className="main flex">
                  <Header />
                  <div className="content flex-grow">{children}</div>
               </div>
               <Toaster position="bottom-center" />
            </body>
         </AuthProvider>
      </html>
   );
}
