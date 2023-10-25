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
const getPromoTexts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promoTextBanner`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch promo texts");
  }
  return res.json();
};
const page = async () => {
  const [categories,promoTexts] = await Promise.all([getCategories(),getPromoTexts()]);
  const menswearPromo = promoTexts.find(text => text.promoArea === "menswear");

  return <MensWear categories={categories} menswearPromo={menswearPromo.text} />;
};

export default page;
