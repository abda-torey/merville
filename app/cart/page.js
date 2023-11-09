import React from 'react'
import Cart from '@/components/Cart/Cart'
const getPromoTexts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/promoTextBanner`,
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
const page = async () => {
  const promos = await getPromoTexts();
  const homepagePromo = promos.find(
    (banner) => banner.promoArea === "homepage"
  );
  console.log(homepagePromo);
  return <Cart text={homepagePromo.text} />
}

export default page
