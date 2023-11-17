
import Product from "@/components/Product";
import React from "react";
const getProduct = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const page = async ({params}) => {
  const {id} = params
  const product = await getProduct(id);
  
  console.log(product);
  return (
    <>
    <Product product = {product.product} text={product.promoTextBanner} />
    </>
  );
};

export default page;
