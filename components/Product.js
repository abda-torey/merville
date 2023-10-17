"use client";
import CartContext from "@/app/context/CartContext";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid"; // You might need to install @heroicons/react

const sampleProductDetails = {
  details: [
    "Made with 100% organic cotton.",
    "Slim fit design.",
    "Button-up collar.",
    "Machine washable.",
    "Available in multiple sizes and colors.",
  ],

  returnsInfo: [
    "Returns accepted within 30 days of purchase.",
    "Items must be unused and in the original packaging.",
    "Return shipping fees are the responsibility of the customer.",
    "Refunds will be processed within 7-10 business days after receiving the return.",
    "Exchanges are subject to product availability.",
  ],
};

const Product = ({ product }) => {
  const [selectedSize, setSize] = useState(null);
  const [selectedColor, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useContext(CartContext);
  console.log(product);
  const addToCartHandler = () => {
    console.log("Selected Product Details:", {
      productId: product.id,
      selectedSize,
      selectedColor,
      quantity,
    });
    addItemToCart({
      productId: product.id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      image: product.imageDetails[0].imageUrl,
      stock: product.stock,
    });
  };
  return (
    <div className="flex flex-col  mb-8 mt-24 md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-2 mx-3">
      {/* First Div */}
      <div className="flex-1 min-h-[200px] md:min-h-[700px] md:w-1/3 p-4 bg-customColor shadow-md  flex justify-center items-center">
        <Image
          src={product.imageDetails[0].imageUrl}
          alt="Description"
          width={500}
          height={500}
          className=""
        />
      </div>

      {/* Second Div */}
      <div className="flex-1 min-h-[200px] md:min-h-[700px] md:w-1/3 p-4 bg-customColor shadow-md  flex justify-center items-center">
        <Image
          src={product.imageDetails[1].imageUrl}
          alt="Description"
          width={500}
          height={500}
          className=""
        />
      </div>

      {/* Third Div */}
      <div className="w-full md:w-1/4 p-6 min-h-[200px] md:min-h-[700px] text-gray-600 bg-white flex flex-col items-start justify-start md:px-10">
        <h2 className="text-lg font-body font-medium">{product.name}</h2>
        <p className="text-sm font-medium tracking-widest mb-4">
          ${product.price}
        </p>

        <div className="space-y-2 mb-8">
          <span className=" text-xs tracking-tighter">Select Color</span>
          <div className="flex space-x-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`w-7 h-7 border-1 border-black ${
                  selectedColor === color ? "border-4" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setColor(color)}
              ></button>
            ))}
          </div>
        </div>

        <div className="relative mb-8">
          <select
            id="size"
            onChange={(e) => setSize(e.target.value)}
            value={selectedSize}
            className="appearance-none text-sm w-40 pl-2 pr-8 py-1 border border-gray-300 relative bg-transparent"
          >
            <option value="" selected disabled>
              Select size
            </option>
            {product.sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="h-4 w-4 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 3 15 25"
            >
              <path d="M5.293 9.293L10 14.586l4.707-4.293a.999.999 0 1 1 1.414 1.414l-5.707 5.707a.999.999 0 0 1-1.414 0L3.586 10.707a.999.999 0 1 1 1.414-1.414z" />
            </svg>
            <span className="block w-[0.3px] bg-gray-300 absolute left-[0.3rem] h-full top-1/2 transform -translate-y-1/2"></span>
          </div>
        </div>

        <button
          onClick={addToCartHandler}
          className="bg-black mb-10 text-white text-xs w-48 md:w-full py-2"
        >
          ADD TO BAG
        </button>

        {/* Disclosure panels */}
        <div className="">
          {[
            {
              title: "Product Details and Sizing",
              items: sampleProductDetails.details,
            },
            {
              title: "Delivery and Returns",
              items: sampleProductDetails.returnsInfo,
            },
          ].map((panel, idx) => (
            <Disclosure
              as="div"
              key={idx}
              className={idx < panel.length - 1 ? "border-b" : " mb-5"}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between items-center w-full py-2  text-left border-b border-gray-200 space-x-8">
                    <span className="text-xs font-medium">{panel.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-500`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Disclosure.Button>
                  <Disclosure.Panel
                    as="ul"
                    className="mt-2 space-y-2 px-4 py-2"
                  >
                    {panel.items.map((item, idx) => (
                      <li key={idx} className="text-xs">
                        {item}
                      </li>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
