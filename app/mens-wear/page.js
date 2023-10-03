import React from "react";

import MensWear from "@/components/mensWear/MensWear";
const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const page = async () => {
  const categories = await getCategories()
  return (
    <MensWear categories={categories} />
  );
};

export default page;
