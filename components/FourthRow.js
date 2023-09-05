import React from "react";
import Image from "next/image";

const FourthRow = () => {
  return (
    <div className="flex   w-full  md:h-[700px] justify-center items-start bg-white  ">
      <div className="flex  flex-col md:flex-row  items-center justify-center bg-white">
        {/* First div */}
        <div className="flex w-full p-8 items-center   justify-center">
          <Image src="/tshirt2.png" width={350} height={350} />
        </div>

        {/* Second div */}
        <div className="w-full  flex flex-col md:w-1/2  p-2   items-center justify-start  mb-8   text-black">
          <div className="">
            <Image
              src="/tshirt.png"
              width={250}
              height={250}
              alt="Description for Tshort"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <h2 className=" text-2xl md:text-3xl text-center font-extrabold  mt-3 tracking-widest ">
                MENS T-SHIRT
              </h2>
            </div>
            <div className="">
              <p className="mt-2 text-xs text-center mb-4 font-normal tracking-tighter ">
                Discover the collection of 100% cotton tshirt,a luxury feeling
                is added from the merization of the fabric
              </p>
            </div>
            <div>
              <button className=" font-extralight text-xs border-2 text-black border-black px-5 py-2 bg-transparent focus:outline-none w-36 md:w-40">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthRow;
