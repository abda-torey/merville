"use client";
import React, { useContext } from "react";

import CartContext from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";



const CartSideBar = () => {
  const {
    addItemToCart,
    cart,
    deleteItemFromCart,
    updateQuantity,
    toggleDrawerBag,
  } = useContext(CartContext);
// First, calculate the total in cents
const amountInCents = cart?.cartItems?.reduce(
  (acc, item) => acc + item.quantity * item.price,
  0
);

// Convert the total in cents to a floating-point number for euros
const amountWithoutTax = amountInCents / 100;

// Calculate the tax as a numerical value
const tax = amountWithoutTax * 0.15;

// Sum the amounts to get the total
const totalAmount = amountWithoutTax + tax;

// Now, format the numbers as strings with two decimal places for display
const amountWithoutTaxStr = amountWithoutTax.toFixed(2);
const taxStr = tax.toFixed(2);
const totalAmountStr = totalAmount.toFixed(2);


  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center pt-5    gap-12">
        <h3 className="font-FuturaMedium font-light text-lg ml-4 mr-4 ">
          SHOPPING BAG
        </h3>
        <button className="text-2xl ml-2 " onClick={() => toggleDrawerBag()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {cart?.cartItems?.length === 0 ? (
          <h3 className="text-center font-FuturaBold justify-center text-lg mt-16 text-black">
            No Items in Bag
          </h3>
        ) : (
          cart?.cartItems?.map((product, productIdx) => (
            <div className="flex mt-7 " key={productIdx}>
              {/* Product Image */}
              <div className=" w-[150px] md:h-[152px] p-2 bg-customColor flex items-center justify-center">
                <Image
                  src={product.image}
                  width={500}
                  height={500}
                  alt={product.name}
                  className=" w-28"
                />
              </div>

              {/* Product Details */}
              <div className="pl-2 w-[180px] flex flex-col ">
                <div>
                  <h2
                    className="font-FuturaMedium tracking-wide font-light text-sm mb-0 mt-3"
                  >
                    {product.name}
                  </h2>
                  <p
                    className="font-FuturaMedium text-gray-600 font-extralight tracking-tighter text-xs"
                  >
                    {product.color} {" "} {product.description}
                  </p>
                  <p
                    className="font-FuturaMedium text-gray-600  mb-2 text-xs"
                  >
                    Size: {product.size}
                  </p>
                  <span className="font-FuturaMedium  text-xs">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                </div>

                {/* Edit, Remove, and Quantity Selector */}
                <div className="flex  mt-3 justify-between">
                  <div className="flex space-x-2 items-center">
                    <button
                      className="font-FuturaMedium text-black underline py-1 text-xs"
                    >
                      Edit
                    </button>
                    <div className="border-l h-[14px] border-gray-950 mx-2"></div>{" "}
                    {/* Separator */}
                    <button
                      className="font-FuturaMedium text-black underline py-1 text-xs"
                      onClick={() =>
                        deleteItemFromCart(
                          product.productId,
                          product.color,
                          product.size
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <div className="relative ml-6">
                    <span className="absolute top-1/2 left-1  md:left-1 transform -translate-y-1/2 text-[9px] pointer-events-none font-FuturaMedium">
                      QTY:
                    </span>
                    <select
                      className=" appearance-none border p-[3px] font-FuturaMedium text-[9px] pl-6 w-14" // Adjusted padding, width, and removed unnecessary padding
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          product.productId,
                          product.color,
                          product.size,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      {[...Array(product.stock).keys()].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-[7px] top-1/2 transform -translate-y-1/2 h-3 w-3 pointer-events-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <hr className="mt-5"></hr>
      <div className="bg-white py-4 mt-auto">
        <div className="py-0 md:py-4 flex mx-9 justify-between items-center">
          <span className="font-FuturaMedium text-xs font-bold">
            SUBTOTAL
          </span>
          <span className="font-FuturaMedium text-xs font-bold">
            £ {amountWithoutTaxStr}
          </span>
        </div>
        <div className="flex px-4 md:px-0 flex-col md:flex-row items-center justify-center mt-5 space-y-4 md:space-y-0 md:space-x-4 font-FuturaMedium tracking-widest">
          <button
            className=" bg-black text-white border-2 text-xs tracking-tighter px-4 py-2 w-full md:w-28"
          >
            <Link href="/cart">VIEW BAG</Link>
          </button>

          <button
            className=" bg-black border-2 text-white text-xs tracking-tighter px-4 py-2 w-full md:w-28"
          >
            <Link href="/checkoutPage">CHECKOUT</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
