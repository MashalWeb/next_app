"use client";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import image from "@/components/profileimg.jpg";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Delete, Edit, Mail, Settings2, User2Icon } from "lucide-react";

function Setting() {
   const [products, setProducts] = useState([]);
   const [featureProduct, setFeatureProduct]: any = useState({});

   const [users, setUsers] = useState([]);
   const [name, setname] = useState("");
   const [email, setemail] = useState("");
   const [password, setpassowrd] = useState("");
   const [loading, setloading] = useState(false);
   useEffect(() => {
      fetchProducts();
      getFeatureProduct();
      getAdmains();
   }, []);

   const fetchProducts = async () => {
      try {
         const { data } = await axios.get("/api/products");
         if (data) setProducts(data.allProducts);
      } catch (error) {
         const err = error as AxiosError<any>;
         toast.error(err.message || "something went wrong, refresh the page");
      }
   };

   const getFeatureProduct = async () => {
      try {
         const { data } = await axios.get("/api/featureProd");
         if (data) setFeatureProduct(data.featureProduct);
      } catch (error: any) {
         const err = error as AxiosError<any>;
         toast.error(
            err.response?.data.message ||
               "something went wrong, refresh the page"
         );
      }
   };

   const handleSetFeatureProduct = async (
      ev: ChangeEvent<HTMLSelectElement>
   ) => {
      try {
         const { data } = await axios.post("/api/featureProd", {
            productName: ev.target.value,
         });
         if (data?.success === true) toast.success(data.message);

         getFeatureProduct();
      } catch (error: any) {
         const err = error as AxiosError<any>;
         toast.error(err.response?.data.message || "try Agin");
      }
   };

   const handleAddUser = async () => {
      setloading(true);
      try {
         const { data } = await axios.post("/api/sign-up", {
            name,
            email,
            password,
         });
         if (data?.success === true) toast.success(data.message);
         getAdmains();
      } catch (error: any) {
         const e = error as AxiosError<any>;
         toast.error(e.response?.data.message || "try Again");
      } finally {
         setloading(false);
         setemail("");
         setname("");
         setpassowrd("");
      }
   };

   const getAdmains = async () => {
      try {
         const { data } = await axios.get("/api/users");
         if (data) setUsers(data.admains);
      } catch (error: any) {
         const e = error as AxiosError<any>;
         toast.error(e.response?.data.message || "try Again");
      }
   };

   const handleDeleteUser = async (userID: string | undefined) => {
      try {
         const { data } = await axios.delete(`/api/users?deleteID=${userID}`);
         if (data?.success === true) {
            toast.success(data.message);
         }
         getAdmains();
      } catch (error: any) {
         const e = error as AxiosError<any>;
         toast.error(e.response?.data.message || "try Again");
      }
   };
   return (
      <div className="p-1 main ml-5 mr-5 mt-3 w-auto relative">
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
            <div className="w-full bg-white cus-shad p-1 py-2 rounded-2xl">
               <h1 className="text-center">Basic Setting</h1>
            </div>
            <div className="w-full bg-white cus-shad p-2 rounded-2xl mt-4">
               <h2>Feature Product</h2>
               <p className="sm-para cus-gray">
                  Feature product will be show in hero section of webpage.
               </p>

               <div className="min-w-[340px] sm:w-[50%] mt-4">
                  <label htmlFor="productCategory" className="block mb-1 ml-1">
                     <h3 className="text-[16px]">Select Product</h3>
                  </label>
                  <select
                     name="Category"
                     id="productCategory"
                     className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full"
                     value={featureProduct?.productName}
                     onChange={(ev) => handleSetFeatureProduct(ev)}
                  >
                     <option value="No Category">Not Selected</option>
                     {products.length > 0 &&
                        products.map((product: any, index: number) => (
                           <option key={index} value={product.productName}>
                              {product.productName}
                           </option>
                        ))}
                  </select>
               </div>
            </div>
            <div className="w-full bg-white cus-shad p-2 rounded-2xl mt-4">
               <h2>Admains List</h2>
               <p className="sm-para cus-gray">
                  Register New Admains & edit existed ones
               </p>

               <div className="w-full grid lg:grid-cols-10 gap-1 p-1 mt-4 gap-y-2">
                  <input
                     type="text"
                     className="lg:col-span-3 bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3"
                     placeholder="name .."
                     value={name}
                     onChange={(ev) => setname(ev.target.value)}
                  />
                  <input
                     type="email"
                     className="lg:col-span-3 bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3"
                     placeholder="email .."
                     value={email}
                     onChange={(ev) => setemail(ev.target.value)}
                  />
                  <input
                     type="password"
                     className="lg:col-span-3 bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3"
                     placeholder="password .."
                     value={password}
                     onChange={(ev) => setpassowrd(ev.target.value)}
                  />
                  <button
                     type="button"
                     className="lg:col-span-1 bg-grd sm-shad text-white outline-none transition-all focus:cus-shad rounded-3xl p-3"
                     onClick={(ev) => handleAddUser()}
                  >
                     {loading ? "processing..." : "Register"}
                  </button>
               </div>
               <div className="mt-8 p-1 py-3 rounded-2xl cus-shad flex flex-row flex-nowrap w-full items-center justify-evenly">
                  <div className="w-[300px] flex items-center justify-center ">
                     <div className="p-1 bg-grd rounded-md cus-shad">
                        <User2Icon className="stroke-white drop-shadow" />
                     </div>
                     <h3 className="inline-block ml-1">Name</h3>
                  </div>
                  <div className="w-[300px] flex items-center justify-center ">
                     <div className="p-1 bg-grd rounded-md cus-shad">
                        <Mail className="stroke-white drop-shadow" />
                     </div>
                     <h3 className="inline-block ml-1">Email</h3>
                  </div>
                  <div className="w-[300px] flex items-center justify-center ">
                     <div className="p-1 bg-grd rounded-md cus-shad">
                        <Settings2 className="stroke-white drop-shadow" />
                     </div>
                     <h3 className="inline-block ml-1">Edit / Delete</h3>
                  </div>
               </div>
               {users.length > 0 &&
                  users.map((user: any, index: number) => (
                     <div
                        key={index}
                        className="mt-4 p-1 py-3 rounded-2xl flex flex-row flex-nowrap w-full items-center justify-evenly"
                     >
                        <div className="w-[300px] flex items-center justify-center ">
                           <p className="sm-para">{user.name}</p>
                        </div>
                        <div className="w-[300px] flex items-center justify-center ">
                           <p className="sm-para">{user.email}</p>
                        </div>
                        <div className="w-[300px] flex items-center justify-center gap-1">
                           <button className="bg-grd rounded-3xl p-2 px-3 flex gap-1 text-white">
                              Edit <Edit />
                           </button>
                           <button
                              onClick={(ev) => handleDeleteUser(user._id)}
                              className="red-grd rounded-3xl p-2 px-3 flex gap-1 text-white"
                           >
                              Delete <Delete />
                           </button>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
}

export default Setting;
