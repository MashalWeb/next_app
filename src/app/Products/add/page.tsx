"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function AddProducts() {
   const router = useRouter();
   const [categories, setCategories] = useState([]);
   const [properties, setProperties]: any = useState([]);
   const [property, setproperty] = useState({
      name: "",
      value: "",
   });
   const [price, setPrice] = useState("");
   const [desciption, setdesciption] = useState("");
   const [Category, setCategory] = useState("");
   const [stock, setstock] = useState("");
   const [ProductName, setProductName] = useState("");
   const UserID = useSession().data?.user._id;
   const [links, setlinks] = useState([]);

   useEffect(() => {
      fetchCategories();
   }, []);

   const fetchCategories = async () => {
      const { data } = await axios.get("/api/categories");
      setCategories(data.categories);
   };

   const addProperty = () => {
      if (property.name.trim() === "" || property.value.trim() === "") {
         return;
      }

      setProperties((prev: any) => {
         return [...prev, property];
      });
      setproperty({
         name: "",
         value: "",
      });
   };

   const uploadImages = async (files: any) => {
      const data = new FormData();
      data.append("mainImages", files[0]);

      try {
         const res = await axios.post("/api/upload", data);
         toast.success(res.data.message);

         setlinks((prev): any => {
            return [...prev, res.data.filePath];
         });
      } catch (error) {
         const err = error as AxiosError<any>;

         console.log(error);
         toast.error(err.response?.data.message);
      }
   };

   const AddProduct = async () => {
      const data = {
         productName: ProductName,
         productDescription: desciption,
         price: price,
         Images: links,
         category: Category,
         properties: properties,
         stock: stock,
         addedBy: UserID,
      };

      try {
         const res = await axios.post("/api/products", data);
         toast(res.data.message);

         setPrice("");
         setdesciption("");
         setCategory("");
         setstock("");
         setProductName("");
         setlinks([]);
         setProperties([]);

         router.push("/Products");
      } catch (error) {
         console.log("ERROR : ", error);
         const err = error as AxiosError<any>;
         toast.error(err.response?.data.message || "Unexpected Error");
      }
   };
   return (
      <>
         <div className=" px-6 py-5 ">
            <h1 className="m-y-4">Add Product</h1>
            <form onSubmit={(ev) => ev.preventDefault()}>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Product Name</label>
                  <Input
                     value={ProductName}
                     onChange={(ev) => setProductName(ev.target.value)}
                     type="text"
                     placeholder="Product Name"
                  />
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Desciption</label>
                  <Input
                     value={desciption}
                     onChange={(ev) => setdesciption(ev.target.value)}
                     type="text"
                     placeholder="Product Desciption"
                  />
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Category</label>
                  <select
                     name="Category"
                     id=""
                     value={Category}
                     onChange={(ev) => setCategory(ev.target.value)}
                     className="block w-full px-1 py-2 mt-1 rounded-md border border-gray-200"
                  >
                     <option value="No Category">No Category</option>
                     {categories.map((category: any) => (
                        <option key={category._id} value={category.name}>
                           {category.name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Product Properties</label>
                  <div className="mt-1 flex gap-1">
                     <Input
                        value={property.name}
                        onChange={(ev) =>
                           setproperty({ ...property, name: ev.target.value })
                        }
                        type="text"
                        placeholder="name i.e Color"
                     />
                     <Input
                        value={property.value}
                        onChange={(ev) =>
                           setproperty({ ...property, value: ev.target.value })
                        }
                        type="text"
                        placeholder="value i.e Black"
                     />
                  </div>
                  <Button
                     type="button"
                     className="mt-1 bg-green-300"
                     variant={"ghost"}
                     onClick={addProperty}
                  >
                     Add Property
                  </Button>
               </div>

               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Properties List</label>
                  {properties.map((prop: any, index: any) => (
                     <div key={index} className="flex gap-1">
                        <Input value={prop.name} readOnly className="mb-1" />
                        <Input value={prop.value} readOnly className="mb-1" />
                     </div>
                  ))}
               </div>

               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Upload Images</label>
               </div>
               <div className="sm:w-[600px] w-full mt-3 flex flex-row gap-2 flex-wrap align-middle justify-start ">
                  <div className="relative">
                     <Input
                        type="file"
                        name="mainImages"
                        onChange={(ev) => uploadImages(ev.target.files)}
                        className="shadow w-28 h-28 bg-white rounded-xl "
                     />
                     <Upload
                        size={30}
                        className="absolute top-1/2 left-1/2 -translate-x-2/4  -translate-y-2/4"
                     />
                  </div>
                  {links.map((dev: any, index: any) => (
                     <div
                        className="shadow w-28 h-28 bg-white rounded-xl "
                        key={index}
                     >
                        <img
                           src={dev}
                           alt="some"
                           className="w-full h-full object-cover object-center"
                        />
                     </div>
                  ))}
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Product Stock</label>
                  <Input
                     value={stock}
                     onChange={(ev) => setstock(ev.target.value)}
                     type="number"
                     placeholder="Product Stock"
                  />
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <label htmlFor="">Price in PKR</label>
                  <Input
                     value={price}
                     onChange={(ev) => setPrice(ev.target.value)}
                     type="number"
                     placeholder="Product Price"
                  />
               </div>
               <div className="sm:w-[600px] w-full mt-3">
                  <Button
                     className="bg-green-400"
                     type="submit"
                     onClick={AddProduct}
                  >
                     Add Product
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}

export default AddProducts;
