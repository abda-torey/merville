import Image from "next/image";
import React from "react";
import Link from "next/link";
const MensWear = ({ categories }) => {
  return (
    <div className="bg-white">
      <div className="relative w-full h-64 mb-0">
        {" "}
        {/* added mb-16 for spacing */}
        <Image
          src="/menswear.jpg"
          width={100}
          height={100}
          alt="mens wear image"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-24 left-20">
          <span className="text-white font-thin  text-4xl   px-3 py-1 ">
            MENSWEAR
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center  space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2 w-full max-w-full">
          {categories.map((category, idx) => (
            <div
              key={category.id}
              className={`relative flex flex-col items-center justify-center rounded overflow-hidden bg-gray-100 ${
                idx === 0
                  ? "md:row-span-2 h-[calc(2*18rem)] md:h-auto"
                  : "h-[18rem] py-7 pt-10"
              }`}
            >
              <Image
                src={category.imageDetails[0].imageUrl}
                alt={category.name}
                width={100}
                height={100}
                className=" w-60 h-60"
              />

              <div className="mt-2 text-center mb-7">
                <h2 className="text-black text-xl ">{category.name}</h2>
                <Link
                  href={`/mens-wear/${category.id}`}
                  className="text-black text-xs underline"
                >
                  Discover More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MensWear;
