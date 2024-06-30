"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { RefreshCcwDot } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
function Categories() {
   const [categories, setcategroies]: any = useState([]);
   const [categoryName, setCategroyName] = useState("");
   const [editCategory, setEditCategory] = useState("");
   const [editID, setEditID] = useState("");
   useEffect(() => {
      getCategories();
   }, []);

   const getCategories = async () => {
      const res = await axios.get("/api/categories");
      setcategroies(res.data?.categories);
      console.log(categories);
   };

   const handleAddCategory = async function () {
      try {
         if (editCategory !== "") {
            const res = await axios
               .put("/api/categories", {
                  categoryName: editCategory,
                  id: editID,
               })
               .then((res) => {
                  toast.success(res.data.message);
                  setEditCategory("");
                  setEditID("");
               });
         } else {
            const res = await axios.post("/api/categories", {
               categoryName: categoryName,
            });

            toast.success(res.data.message);
            setCategroyName("");
         }
      } catch (error) {
         const err = error as AxiosError<any>;
         toast.error(err.response?.data.message || "Unexpected Error");
      }
      getCategories();
   };

   const handleDelete = async (deleteID: any) => {
      await axios
         .delete("/api/categories?deleteID=" + deleteID)
         .then((res) => toast.success("Delete Successfully"));
      getCategories();
   };

   const EditCategory = (category: any, id: any) => {
      setEditCategory(category.name);
      setEditID(id);
   };

   return (
      <>
         <div className=" px-6 py-5 w-full">
            <div className="p-3 w-full flex align-middle justify-evenly gap-4 flex-wrap">
               <form
                  onSubmit={(e) => e.preventDefault()}
                  action=""
                  className="sm:basis-9/12 w-full bg-white rounded-lg px-6 shadow-xl py-6 mt-4"
               >
                  <h1 className="text-center mb-4">Add Categories</h1>
                  <label htmlFor="" className="mt-4 font-semibold">
                     Category Name
                  </label>
                  <Input
                     type="text"
                     placeholder="Enter Category Name"
                     className="w-full bg-white py-2 px-1 mt-3"
                     value={editCategory === "" ? categoryName : editCategory}
                     onChange={(ev) =>
                        editCategory === ""
                           ? setCategroyName(ev.target.value)
                           : setEditCategory(ev.target.value)
                     }
                  />
                  <Button
                     type="submit"
                     onClick={handleAddCategory}
                     className="bg-green-500 mt-4"
                  >
                     {editCategory ? "Save" : "Add Category"}
                  </Button>
               </form>
               <div className="sm:basis-9/12 w-full bg-white rounded-lg px-6 shadow-xl py-6 mt-4 relative">
                  <h1 className="text-center mb-4">Categories List</h1>
                  {categories.length > 0 ? (
                     categories.reverse().map((category: any, index: any) => (
                        <div
                           key={index}
                           className="flex align-middle gap-x-1 mb-2"
                        >
                           <Input
                              type="text"
                              className="w-full bg-white py-2 px-1"
                              value={category.name}
                              readOnly
                           />
                           <Button
                              variant={"destructive"}
                              type="button"
                              onClick={(ev) => handleDelete(category._id)}
                           >
                              Delete
                           </Button>
                           <Button
                              variant={"secondary"}
                              type="button"
                              onClick={(ev) =>
                                 EditCategory(category, category._id)
                              }
                           >
                              Edit
                           </Button>
                        </div>
                     ))
                  ) : (
                     <p>Nothing</p>
                  )}
                  <div
                     className=" bg-slate-100 cursor-pointer absolute top-4 left-4 p-2 rounded flex justify-center align-middle shadow-lg"
                     onClick={getCategories}
                  >
                     <RefreshCcwDot />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Categories;
