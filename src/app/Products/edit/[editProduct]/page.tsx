"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import productModel from "@/models/product.model";

function Page() {
   const [product, setproduct]: any = useState({});
   const param = useParams();
   console.log(param);
   const productID = param.editProduct;
   useEffect(() => {
      fetchProduct();
   }, [param.editProduct]);

   const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products?productID=${productID}`);
      console.log("Product: ", data);
      setproduct(data?.product);
   };

   console.log("Param: ", param.editProduct);
   return <div>{product ? <h1>{product.productName}</h1> : <p>loding</p>}</div>;
}

export default Page;
