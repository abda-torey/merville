import CarouselDisplay from "@/components/CarouselDisplay";
import Featured from "@/components/Featured";
import Thirdrow from "@/components/Thirdrow";
import FourthRow from "@/components/FourthRow";
import FifthRow from "@/components/FifthRow";
import PromotionBanner from "@/components/PromotionBanner";

const getPromoText = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/promoTextBanner`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default async function Home() {
  const promoText = await getPromoText();
  const homepagePromo = promoText.find(
    (promo) => promo.promoArea === "homepage"
  );

  return (
    <main className="relative">
      <CarouselDisplay />
      <Featured />
      <Thirdrow />
      <FourthRow />
      <FifthRow />
      <PromotionBanner text={homepagePromo.text} />
    </main>
  );
}
