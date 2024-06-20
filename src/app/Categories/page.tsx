"use client";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

function Categories() {
   const [property, setProperty]: any = useState([]);
   const [newProp, setNewProp] = useState("");
   const [newPropValue, setNewPropValue] = useState("");
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
   console.log(typeof property);
   return (
      <>
         <Header />
         <div className="ml-[250px] px-6 py-5 ">
            <h1>Add Categories</h1>
            <form
               onSubmit={(e) => e.preventDefault()}
               action=""
               className="w-full bg-white rounded-lg px-1 py-2 mt-4"
            >
               <div className="sm:w-[500px] w-full">
                  <label htmlFor="" className="mt-4">
                     Category Name
                  </label>
                  <Input
                     type="text"
                     placeholder="Enter Category Name"
                     className="w-full bg-white py-2 px-1 rounded-lg"
                  />
                  <div className="my-4">
                     <h2>Add Properties</h2>
                     <Input
                        type="text"
                        value={newProp}
                        onChange={(e) => setNewProp(e.target.value)}
                        placeholder="Enter property name"
                        className="mt-1"
                     />
                     <Input
                        type="text"
                        value={newPropValue}
                        onChange={(e) => setNewPropValue(e.target.value)}
                        placeholder="Enter property value"
                        className="mt-1"
                     />
                     <Button className="mt-1" onClick={handleAddProperty}>
                        Add Property
                     </Button>

                     <h3 className="mt-1">Properties List</h3>
                     <ul>
                        {property.map((prop: any, index: any) => (
                           <li key={index}>
                              {prop.name} == {prop.value}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <Button type="submit" className="bg-green-500 mt-4">
                     Add Category{" "}
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}

export default Categories;
