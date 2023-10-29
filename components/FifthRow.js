import React from "react";
import Image from "next/image";
const FifthRow = () => {
  return (
    <div className="relative  md:mt-0 w-full h-[400px] md:h-[600px] lg:h-[800px]">
      {/* Image that spans the whole width */}
      <Image
        src="/Shoes.png"
        alt="Description"
        fill
        //  objectFit="cover"
         style={{objectFit:"cover"}}
      />

      {/* 'Coming Soon' text at the center bottom */}
      <h2 className="absolute bottom-5 md:bottom-20 left-1/2 transform -translate-x-1/2 text-2xl md:text-4xl font-extrabold text-black   p-2 ">
        COMING SOON
      </h2>
    </div>
  );
};

export default FifthRow;
