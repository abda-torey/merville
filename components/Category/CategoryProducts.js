"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PromotionBanner from "../PromotionBanner";

const CategoryProducts = ({ title,products, colors, sizes, text }) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="bg-white mt-[50px] md:mt-[60px] mb-0">
      {/* added mb-16 for spacing before footer */}
      <div className="relative w-full h-72 mb-3">
        <Image
          src="/shoesCategory.png"
          width={1000}
          height={1000}
          alt="shoes wear image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-FuturaLight font-medium text-3xl tracking-wider px-3 py-1 uppercase ">
            {title}
          </span>
        </div>
      </div>
      <div className="top-12 md:top-14 z-10 bg-white shadow-sm">
        <div className="flex justify-between items-center text-black p-2 border-b pb-4">
          <div className="flex space-x-1 md:space-x-2  ">
            <span className="text-black text-xs tracking-widest  md:text-sm font-medium">
              Men |
            </span>
            <span className="text-black text-xs tracking-widest md:text-sm font-medium">
              Men {title}
            </span>
          </div>
          <div className="flex space-x-1 md:space-x-4 mr-2 md:mr-5">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center focus:outline-none text-sm tracking-widest"
            >
              Filters
              <svg
                className="ml-1 w-2 h-2 transform rotate-90"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <span>|</span>
            <div className="group relative">
              <span className="cursor-pointer tracking-widest text-gray-500 text-xs">
                Sort by:
              </span>
              <span className="cursor-pointer "> newest</span>
              <div className="absolute right-0 mt-2 w-32 text-xs py-2 bg-white border rounded shadow-xl opacity-0 group-hover:opacity-100 transition duration-150 ease-in">
                <a
                  href="#"
                  className="block text-white px-4 py-2 tracking-widest bg-gray-900"
                >
                  Newest
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 tracking-widest hover:bg-gray-200"
                >
                  Price - High to Low
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 tracking-widest hover:bg-gray-200"
                >
                  Price - Low to High
                </a>
              </div>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="border p-4 text-black">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="mb-2 font-bold">Color</h3>
                {colors?.map((color) => (
                  <div className="flex items-center" key={color.id}>
                    <input
                      type="checkbox"
                      id={color.name}
                      className="mr-3 mt-4"
                    />
                    <label htmlFor={color.name} className="mr-3 mt-4">
                      {color.name}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="mb-2 font-bold">Size</h3>
                {sizes?.map((size) => (
                  <div className="flex items-center" key={size.id}>
                    <input
                      type="checkbox"
                      id={size.name}
                      className="mr-3 mt-4"
                    />
                    <label htmlFor={size.name} className="mr-3 mt-4">
                      {size.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-8 items-center justify-center">
              <button
                onClick={() => {
                  // Apply the filters
                  setShowFilters(false);
                }}
                className="mr-4 bg-black text-white rounded px-4 py-2"
              >
                Apply
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="border border-black text-black px-3 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px] mb-0">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-200 text-black p-4  flex flex-col items-center relative"
          >
            <Image
              width={1000}
              height={1000}
              src={product.imageDetails[0].imageUrl}
              alt={product.name}
              className="w-64 md:w-1/2 mt-10"
            />
            <Link href={`/product/${product.id}`}>
              <h2 className="text-center text-xs mt-16 font-futura  tracking-wider  font-medium">
                {product.name}
              </h2>
              <p className="text-center text-xs font-medium font-body tracking-wider mt-1 md:mb-5">
                £{(product.price / 100).toFixed(2)}
              </p>
            </Link>
            {product.comingsoon && (
              <div className="absolute w-full bottom-0  font-bold tracking-widest  bg-gray-400 text-gray-500 text-xs px-2 ">
                Coming Soon Coming Soon
              </div>
            )}
          </div>
        ))}
      </div>
      <PromotionBanner text={text} />
    </div>
  );
};

export default CategoryProducts;
