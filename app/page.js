'use client'
import CarouselDisplay from "@/components/CarouselDisplay";
import Featured from "@/components/Featured";
import Thirdrow from "@/components/Thirdrow";
import FourthRow from "@/components/FourthRow";

export default function Home() {
  return (
    <main className="relative">
      <CarouselDisplay />
      <Featured />
      <Thirdrow />
      <FourthRow />
    </main>
  );
}
