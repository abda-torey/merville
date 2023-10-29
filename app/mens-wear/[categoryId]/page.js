import React from "react";
import CategoryProducts from "@/components/Category/CategoryProducts";
const getCategoryName = async (categoryId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category/${categoryId}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/colr`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getSizes = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sizes`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const getPromoTexts = async (categoryId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/promoTextBanner/${categoryId}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch promo texts");
    }
    return await res.json();
  } catch (error) {
    // If fetching promoTexts fails, return a default value
    return { text: "" };
  }
};
const page = async ({ params }) => {
  const [categoryname, products, colors, sizes, promoTexts] = await Promise.all(
    [
      getCategoryName(params.categoryId),
      getProducts(params.categoryId),
      getColors(),
      getSizes(),
      getPromoTexts(params.categoryId),
    ]
  );

  return (
    <CategoryProducts
      title={categoryname.name}
      products={products}
      colors={colors}
      sizes={sizes}
      text={promoTexts?.text}
    />
  );
};

export default page;
