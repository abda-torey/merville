"use client";
import CartContext from "@/app/context/CartContext";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid"; // You might need to install @heroicons/react
import ImageSlider from "./ImageSlider";
import PromotionBanner from "./PromotionBanner";
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

const Product = ({ product, text }) => {
  const [selectedSize, setSize] = useState("");
  const [selectedColor, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart, toggleDrawerBag } = useContext(CartContext);
  const [showFeedback, setShowFeedback] = useState(false);

  // check if sizes and colors are required to prevent user from adding to cart without selecting
  const [isSizeRequired, setIsSizeRequired] = useState(
    product?.sizes?.length > 0
  );

  const [isColorRequired, setIsColorRequired] = useState(
    product?.colors?.length > 0
  );
  const canAddToCart = () => {
    if (isSizeRequired && !selectedSize) return false;
    if (isColorRequired && !selectedColor) return false;
    return true;
  };

  const addToCartHandler = () => {
    if (!canAddToCart()) {
      setShowFeedback(true);
      return;
    }
    addItemToCart({
      productId: product?.id,
      name: product?.name,
      description: product?.description,
      size: selectedSize,
      color: selectedColor,
      price: product?.price,
      image: product?.imageDetails[0].imageUrl,
      stock: product?.stock,
    });
    toggleDrawerBag();
    setShowFeedback(false);
    setSize("");
    setColor("");
  };
  return (
    <>
      <div className="  md:flex flex-col mb-0  md:mb-8 mt-20 md:flex-row justify-start items-start space-y-3 md:space-y-0 md:space-x-8 ml-3 ">
        {/* Combined Image Div */}
        <div className="hidden md:col-span-2  flex-1 md:flex-none md:min-h-[700px] md:w-2/3 p-12 bg-customColor shadow-md md:flex  flex-col justify-center items-center overflow-y-auto scrollbar-hide">
          {product?.imageDetails?.map((imageDetail, index) => (
            <Image
              key={index}
              src={imageDetail.imageUrl}
              alt="Description"
              width={1000}
              height={1000}
              className=" mt-24 mb-24 w-72 h-auto"
            />
          ))}
        </div>

        <div className="md:hidden">
          <ImageSlider imageDetails={product?.imageDetails} />
        </div>

        {/* Third Div */}
        <div className="w-full  md:w-1/4 p-4 md:p-6 min-h-[200px] md:min-h-[400px] text-gray-600 font-FuturaLight flex flex-col items-start justify-start md:ml-4  md:pl-14 md:px-10  sticky top-14">
          <h2 className="text-lg text-gray-800 font-semibold">
            {product?.name}
          </h2>
          <p className="text-sm font-semibold text-gray-700 tracking-widest mb-4">
            ${(product?.price / 100).toFixed(2)}
          </p>

          <div className="space-y-2 mb-8">
            <span className=" text-xs tracking-tighter font-semibold text-gray-600">
              Select Color
            </span>
            <div className="flex space-x-2">
              {product?.colors?.map((color, index) => (
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

          <div className="relative  mb-8">
            <select
              id="size"
              onChange={(e) => setSize(e.target.value)}
              value={selectedSize}
              className="appearance-none text-sm w-64 md:w-40 pl-2 pr-8 py-1 border border-gray-300 relative bg-transparent"
            >
              <option value="" defaultValue disabled>
                Select size
              </option>
              {product?.sizes?.map((size, index) => (
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
            onClick={() => {
              addToCartHandler();
            }}
            className="bg-black mb-10 text-white text-xs w-[90%] md:w-full py-2"
          >
            ADD TO BAG
          </button>
          {showFeedback && (
            <p className="text-xs text-red-500 mt-2">
              Please select required attributes before adding to bag.
            </p>
          )}

          {/* Disclosure panels */}
          <div className=" w-[90%] md:w-60 font-FuturaLight">
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
      <div>
        <PromotionBanner text={text} />
      </div>
    </>
  );
};

export default Product;
