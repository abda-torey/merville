"use client";
import React, { useContext } from "react";
import localFont from "next/font/local";
import CartContext from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const futuraMedium = localFont({
  src: "../../public/fonts/futura medium bt.ttf",
  variable: "--font-futura-medium",
});

const CartSideBar = ({ toggleDrawerBag }) => {
  const { addItemToCart, cart, deleteItemFromCart, updateQuantity } =
    useContext(CartContext);
  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = (amountWithoutTax * 0.15).toFixed(2);
  const totalAmount = Number(amountWithoutTax) + Number(tax);
 
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-center pt-5   gap-8">
        <h3 className={`${futuraMedium.className} font-light text-sm`}>
          SHOPPING BAG
        </h3>
        <button className="text-2xl" onClick={() => toggleDrawerBag()}>
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
          <h3 className="text-center justify-center text-lg mt-16 text-black">No Items in Bag</h3>
        ) : (
          cart?.cartItems?.map((product, productIdx) => (
            <div className="flex mt-7 " key={productIdx}>
              {/* Product Image */}
              <div className=" w-[150px] p-4 bg-customColor flex items-center justify-center">
                <Image
                  src={product.image}
                  width={500}
                  height={500}
                  alt={product.name}
                  className=" w-48"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 w-[145px] flex flex-col">
                <div>
                  <h2
                    className={`${futuraMedium.className} tracking-wide font-light text-sm mb-2`}
                  >
                    {product.name}
                  </h2>
                  <p
                    className={`${futuraMedium.className} text-gray-600 font-extralight text-xs`}
                  >
                    Color: {product.color}
                  </p>
                  <p
                    className={`${futuraMedium.className} text-gray-600  mb-3 text-xs`}
                  >
                    Size: {product.size}
                  </p>
                  <span className={`${futuraMedium.className}  text-xs`}>
                    $ {product.price}
                  </span>
                </div>

                {/* Edit, Remove, and Quantity Selector */}
                <div className="flex  mt-4 justify-between">
                  <div className="flex space-x-2">
                    <button
                      className={`${futuraMedium.className} text-gray-600 underline py-1 text-xs`}
                    >
                      Edit
                    </button>
                    <div className="border-l h-6 border-gray-950 mx-2"></div>{" "}
                    {/* Separator */}
                    <button
                      className={`${futuraMedium.className} text-gray-600 underline py-1 text-xs`}
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
                    <span className="absolute top-1/2 left-0.5 transform -translate-y-1/2 text-xs pointer-events-none">
                      QTY:
                    </span>
                    <select
                      className="border p-1 text-xs pl-7 w-16" // Adjusted padding, width, and removed unnecessary padding
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
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <hr className="mt-5"></hr>
      <div className="bg-white py-4 mt-auto">
        <div className="py-4 flex mx-9 justify-between items-center">
          <span className={`${futuraMedium.className} text-xs`}>SUBTOTAL</span>
          <span className={`${futuraMedium.className} text-xs`}>
            £ {amountWithoutTax}
          </span>
        </div>
        <div className="flex items-center justify-center mt-5">
          <div className="flex justify-between space-x-4 font-futura ">
            <button
              className={`${futuraMedium.className} bg-black text-white text-xs tracking-tighter px-4 py-2 w-24`}
            >
              <Link href="/cart">VIEW BAG</Link>
            </button>

            <button
              className={`${futuraMedium.className} bg-black text-white text-xs tracking-tighter px-4 py-2 w-24`}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
