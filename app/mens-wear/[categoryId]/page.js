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
const page = async ({ params }) => {
  const products = await getProducts(params.categoryId);
  return <CategoryProducts products={products} />
};

export default page;
