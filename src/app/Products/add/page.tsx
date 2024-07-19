"use client";
import image from "@/components/profileimg.jpg";
import Image from "next/image";
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
   const [links, setlinks] = useState([
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
   ]);

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

   // const uploadImanpm = async (files: any) => {
   //    const data = new FormData();
   //    data.append("mainImages", files[0]);

   //    try {
   //       const res = await axios.post("/api/upload", data);
   //       toast.success(res.data.message);

   //       setlinks((prev): any => {
   //          return [...prev, res.data.filePath];
   //       });
   //    } catch (error) {
   //       const err = error as AxiosError<any>;

   //       console.log(error);
   //       toast.error(err.response?.data.message);
   //    }
   // };

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

         if (res.data?.success === false) {
            toast.error(res.data.message);
         } else {
            toast.success(res.data.message);
            setPrice("");
            setdesciption("");
            setCategory("");
            setstock("");
            setProductName("");
            // setlinks([]);
            setProperties([]);
         }
         //
      } catch (error) {
         console.log("ERROR : ", error);
         const err = error as AxiosError<any>;
         console.log(err.response?.data);
         toast.error(err.response?.data.message || "Unexpected Error");
      }
   };

   return (
      <div className="p-1 main ml-5 mr-5 mt-3 w-auto">
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
         <div className="bg w-full p-3 py-5 mt-4 rounded-2xl min-h-[300px]">
            <div className="bg-white py-4 px-3 w-full rounded-2xl cus-shad">
               <h2 className="text-center text-[22px]">Add New Product</h2>
               <div className="p-1 py-2 rounded-2xl bg-white cus-shad mt-4 w-full flex flex-col items-start justify-start gap-y-3">
                  {/*  */}
                  <div className="w-full flex flex-wrap items-center justify-center gap-2">
                     <div className="basis-[47%] min-w-[340px]">
                        <label
                           htmlFor="productName"
                           className="block mb-1 ml-1"
                        >
                           <h4>Product Name</h4>
                        </label>
                        <input
                           className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full"
                           type="text"
                           id="productName"
                           value={ProductName}
                           onChange={(e) => setProductName(e.target.value)}
                           placeholder="Product Name ..."
                        />
                     </div>
                     <div className="basis-[47%] min-w-[340px]">
                        <label
                           htmlFor="productPrice"
                           className="block mb-1 ml-1"
                        >
                           <h3>Product Price</h3>
                        </label>
                        <input
                           className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full"
                           type="number"
                           value={price}
                           onChange={(ev) => setPrice(ev.target.value)}
                           id="productPrice"
                           placeholder="Product Price ..."
                        />
                     </div>
                  </div>
                  {/*  */}
                  <div className="w-full px-[26px]">
                     <div className="w-full">
                        <label
                           htmlFor="productDesc"
                           className="block mb-1 ml-1"
                        >
                           <h3>Product Description</h3>
                        </label>
                        <textarea
                           name=""
                           id="productDesc"
                           cols={30}
                           rows={30}
                           value={desciption}
                           onChange={(ev) => setdesciption(ev.target.value)}
                           className="bg-white border-[0.5px] sm-shad text-black outline-none  focus:cus-shad rounded-3xl p-3 w-full h-[100px]"
                           placeholder="Product Description .."
                        ></textarea>
                     </div>
                  </div>
                  {/*  */}
                  <div className="w-full flex flex-wrap items-center justify-center gap-2">
                     <div className="basis-[47%] min-w-[340px]">
                        <label
                           htmlFor="productStock"
                           className="block mb-1 ml-1"
                        >
                           <h3>Product Stock</h3>
                        </label>
                        <input
                           className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full"
                           type="number"
                           value={stock}
                           onChange={(ev) => setstock(ev.target.value)}
                           id="productStock"
                           placeholder="Product Stock ..."
                        />
                     </div>
                     <div className="basis-[47%] min-w-[340px]">
                        <label
                           htmlFor="productCategory"
                           className="block mb-1 ml-1"
                        >
                           <h3>Product Category</h3>
                        </label>
                        <select
                           name="Category"
                           id="productCategory"
                           className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full"
                           value={Category}
                           onChange={(ev) => setCategory(ev.target.value)}
                        >
                           <option value="No Category">No Category</option>
                           {categories.map((category: any, index: number) => (
                              <option key={index} value={category.name}>
                                 {category.name}
                              </option>
                           ))}
                        </select>
                     </div>
                  </div>
                  {/*  */}
                  <div className="w-full flex flex-wrap px-[26px] items-center justify-start gap-2">
                     <label htmlFor="" className="block mb-1 ml-1 w-full">
                        <h3>Add Product Properties</h3>
                     </label>

                     <div className="basis-[40%] min-w-[250px]">
                        <input
                           className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full"
                           type="text"
                           placeholder="Property i.e Color"
                           value={property.name}
                           onChange={(ev) =>
                              setproperty({
                                 ...property,
                                 name: ev.target.value,
                              })
                           }
                        />
                     </div>
                     <div className="basis-[40%] min-w-[250px]">
                        <input
                           className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full"
                           type="text"
                           placeholder="Value i.e Black"
                           value={property.value}
                           onChange={(ev) =>
                              setproperty({
                                 ...property,
                                 value: ev.target.value,
                              })
                           }
                        />
                     </div>
                     <div>
                        <button
                           onClick={addProperty}
                           className="bg-grd rounded-3xl text-white w-[170px] py-3"
                        >
                           Add
                        </button>
                     </div>
                  </div>
                  {/*  */}
                  <div className=" mt-3 w-full">
                     {properties.length > 0 &&
                        properties.map((prop: any, index: number) => (
                           <div
                              key={index}
                              className="w-full flex flex-wrap px-[26px] items-center justify-start gap-2 mb-2"
                           >
                              <div className="basis-[35%] min-w-[230px]">
                                 <div className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full">
                                    {prop.name}
                                 </div>
                              </div>
                              <div className="basis-[35%] min-w-[230px]">
                                 <div className="bg-white border-[0.5px] sm-shad text-black outline-none transition-all focus:cus-shad rounded-3xl p-3 w-full">
                                    {prop.value}
                                 </div>
                              </div>
                              <div>
                                 <button className="bg-grd rounded-3xl text-white w-[127px] py-3">
                                    Edit
                                 </button>
                              </div>
                              <div>
                                 <button className="red-grd rounded-3xl text-white w-[127px] py-3">
                                    Delete
                                 </button>
                              </div>
                           </div>
                        ))}
                  </div>
                  {/*  */}
                  <div className="w-full px-[26px]">
                     <div className="w-full">
                        <label htmlFor="productImg" className="block mb-1 ml-1">
                           <h3>Product Images</h3>
                        </label>
                        <div
                           id="productImg"
                           className="flex flex-wrap gap-2 items-center justify-start bg-white border-[0.5px] sm-shad rounded-3xl p-3 w-full min-h-[120px]"
                        >
                           {links.length > 0 &&
                              links.map((url: any, index: number) => (
                                 <div
                                    key={index}
                                    className="border-[0.5px] overflow-hidden rounded-2xl w-[110px] h-full"
                                 >
                                    <img
                                       alt="Product Image"
                                       src={url}
                                       width={80}
                                       height={80}
                                       className="w-full h-full object-cover object-center"
                                    />
                                 </div>
                              ))}
                           <div className="cursor-pointer rounded-2xl relative bg-grd w-[110px] h-[107px]">
                              <input
                                 className=" opacity-0 w-full h-full"
                                 type="file"
                                 name="mainImages"
                                 // onChange={(ev) =>
                                 //    uploadImanpm(ev.target.files)
                                 // }
                              />
                              <Upload
                                 size={30}
                                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white drop-shadow"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  {/*  */}
                  <div className="w-full flex flex-wrap items-center justify-center gap-2">
                     <div className="basis-[55%] min-w-[220px]">
                        <button
                           className="sm-shad transition-all rounded-3xl p-3 bg-green w-full text-white text-[20px]"
                           onClick={AddProduct}
                        >
                           Add Product
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddProducts;
