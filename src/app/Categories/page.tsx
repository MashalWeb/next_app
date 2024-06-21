"use client";
import { Loader, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Categories() {
   const [property, setProperty]: any = useState([]);
   const [newProp, setNewProp] = useState("");
   const [newPropValue, setNewPropValue] = useState("");
   const [Category, setCategroy] = useState("")
   const handleAddProperty = () => {
      if (newProp.trim() !== "") {
         const newCategory: any = {
            name: newProp,
            value: newPropValue,
            // Initialize other properties
         };
         setProperty([...property, newCategory]);
         setNewProp("");
         setNewPropValue("");
      }
   };

   const handleAddCategory = async function() {
      try {
         const res = await axios.post("/api/categories",
            {categoryName:Category,Properties:property}
         )
         toast.success(res.data.message)
         setCategroy("")
         setProperty([])
         
      } catch (error ) {
         const err = error as AxiosError<any>
         toast.error(err.response?.data.message || "Unexpected Error")

      }
   }
   const getCategories = async () => {
      const {data} = await axios.get("/api/categories")
      console.log(data.categories);
      
   }
   return (
      <>
         <div className=" px-6 py-5 w-full">
            <div className="p-3 w-full flex align-middle justify-evenly gap-4 flex-wrap">
            <form
               onSubmit={(e) => e.preventDefault()}
               action=""
               className="sm:w-[450px] w-full bg-white rounded-lg px-6 shadow-xl py-6 mt-4"
            >
                   <h1 className="text-center mb-4">Add Categories</h1>
                  <label htmlFor="" className="mt-4 font-semibold">
                     Category Name
                  </label>
                  <Input
                     type="text"
                     placeholder="Enter Category Name"
                     className="w-full bg-white py-2 px-1 mt-3"
                     value={Category}
                     onChange={(e)=> setCategroy( e.target.value)}
                  />
                  <div className="my-4">
                     <h2 className="font-semibold">Add Properties</h2>
                     <Input
                        type="text"
                        value={newProp}
                        onChange={(e) => setNewProp(e.target.value)}
                        placeholder="Enter property name"
                        className="mt-3"
                     />
                     <Input
                        type="text"
                        value={newPropValue}
                        onChange={(e) => setNewPropValue(e.target.value)}
                        placeholder="Enter property value"
                        className="mt-3"
                     />
                     <Button className="mt-3" onClick={handleAddProperty}>
                        Add Property
                     </Button>

                     <ul className=" mt-4">
                        {property.map((prop: any, index: any) => (
                           <li key={index} className="flex">
                              <span className="w-[50%] mr-2 font-semibold bg-gray-50 shadow my-1 p-2 rounded-md">{prop.name}</span>
                              <span className="w-[50%] mr-2 font-semibold bg-gray-50 shadow my-1 p-2 rounded-md">{prop.value}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <Button type="submit" onClick={handleAddCategory} className="bg-green-500 mt-4">
                     Add Category{" "}
                  </Button>
            </form>
            <div
               className="sm:w-[450px] relative w-full bg-white rounded-lg px-3 shadow-xl py-6 mt-4"
            >
                  <RefreshCcwIcon className="absolute cursor-pointer top-5 left-3" onClick={getCategories}/>
                   <h1 className="text-center mb-4">Categories List</h1>

                  <div className="flex justify-between bg-gray-100 mb-2 gap-1 font-semibold p-2 px-6">
                  <span>Name</span>
                  <span className="ml-[70px]">Property</span>
                  <span>options</span>
                  </div>
                  <div className="flex bg-gray-50 mb-2 gap-1 p-2">
                  <Input
                     type="text"
                     value={"Iphone"}
                     readOnly
                     className="w-full bg-white py-2 px-1 text-[13px]"
                  />
                  <select name="property" id="" className="border rounded-lg px-5">
                     <option value="">IPhones</option>
                     <option value="">laptops</option>
                     <option value="">mobiles</option>
                  </select>
                  <Button variant={"destructive"}>Delete</Button>
                  </div>
            </div>
            </div>
         </div>
      </>
   );
}

export default Categories;
