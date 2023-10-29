import Image from "next/image";
import React from "react";
import Link from "next/link";
import PromotionBanner from "../PromotionBanner";

const MensWear = ({ categories, menswearPromo }) => {
  return (
    <div className="bg-white">
      <div className="relative w-full h-80 mb-0">
        <Image
          src="/menswear.jpg"
          width={1000}
          height={1000}
          alt="mens wear images"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-28 left-0 flex items-center pl-5">
          <span className="text-white font-thin text-4xl px-3 py-1">
            MENSWEAR
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1 mb-2">
        {/* displaying the first three categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px] mt-2 w-full max-w-full ">
          {categories.slice(0, 3).map((category, idx) => (
            <Link
              key={category.id}
              href={`/mens-wear/${category.id}`}
              className={`relative flex flex-col items-center justify-center overflow-hidden bg-gray-100 hover:bg-gray-200 ${
                idx === 0
                  ? "md:col-span-1 md:row-span-2 h-[17rem] md:h-[calc(2*18rem)] "
                  : "h-[17rem] md:h-[18rem] py-7"
              }`}
            >
              <Image
                src={category.imageDetails[0].imageUrl}
                alt={category.name}
                width={250}
                height={250}
                className="w-44 h-44 object-contain"
              />
              <div className="text-center my-2">
                <h2 className="text-black font-medium text-xl mb-2">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
        {/* displaying the fourth and fifth category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px] mt-2 w-full max-w-full">
          {categories.slice(3, 5).map((category, idx) => (
            <Link
              key={category.id}
              href={`/mens-wear/${category.id}`}
              className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-100 hover:bg-gray-200 h-[18rem]"
            >
              <Image
                src={category.imageDetails[0].imageUrl}
                alt={category.name}
                width={250}
                height={250}
                className="w-44 h-44 object-contain"
              />
              <div className="text-center my-2">
                <h2 className="text-black font-medium text-xl mb-2">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
            {/* displaying the rest of the categories in a row of three cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px] mt-2 mb-2 w-full max-w-full">
          {categories.slice(5, 15).map((category, idx) => (
            <Link
              key={category.id}
              href={`/mens-wear/${category.id}`}
              className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-100 hover:bg-gray-200 h-[18rem]"
            >
              <Image
                src={category.imageDetails[0].imageUrl}
                alt={category.name}
                width={250}
                height={250}
                className="w-44 h-44 object-contain"
              />
              <div className="text-center my-2">
                <h2 className="text-black font-medium text-xl mb-2">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <PromotionBanner text={menswearPromo} />
    </div>
  );
};

export default MensWear;
