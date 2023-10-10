import React from "react";
import CategoryProducts from "@/components/Category/CategoryProducts";

const getProducts = async (categoryId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categoryId}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const getColors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/colr`,{cache:'no-store'});
  if (!res.ok){
    throw new Error("Failed to fetch data")
  }
  return res.json()
}
const getSizes = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sizes`,{cache:'no-store'});
  if (!res.ok){
    throw new Error("Failed to fetch data")
  }
  return res.json()
}
const page = async ({ params }) => {
  const [products,colors,sizes] = await Promise.all([getProducts(params.categoryId),getColors(),getSizes()]) 
  
  return <CategoryProducts products={products} colors={colors} sizes={sizes} />
};

export default page;
