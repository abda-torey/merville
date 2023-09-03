import React from "react";
import Image from "next/image";
const Featured = () => {
  return (
    <div className="relative w-screen h-[700px] md:w-full md:h-screen">
      {/* Image */}
      <Image
        src="/Hats.png"
        alt="Description of Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      {/* Black overlay - can adjust opacity as needed */}
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

      {/* Text & Button */}
      <div className="absolute text-left text-black items-start bottom-16 left-5 md:left-10 lg:left-64 flex flex-col gap-2 justify-end w-48">
        {/* The new header and button */}
        <h2 className="text-2xl md:text-3xl font-bold md:font-extrabold mb-2 md:mb-4 ">HEADWEAR</h2>
        <p className="  md:text-lg font-normal md:mb-4 ">SNAPBACK HAT</p>
        
        <button className=" font-light text-xs border-2 border-black px-5 py-2 bg-transparent focus:outline-none w-36 md:w-40">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Featured;
