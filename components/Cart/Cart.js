"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartContext from "@/app/context/CartContext";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PromotionBanner from "../PromotionBanner";

const Cart = ({ text }) => {
  const {
    addItemToCart,
    cart,
    deleteItemFromCart,
    updateQuantity,
    toggleDrawerBag,
  } = useContext(CartContext);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const searchParams = useSearchParams();
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const isGuest = localStorage.getItem("guestEmail");
  console.log(text);

  // items in cart
  const cartItemCount = cart && cart.cartItems ? cart.cartItems.length : 0;
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

  const onCheckOut = async (event) => {
    event.preventDefault();
    if (!isSignedIn && !isGuest) {
      router.push("/checkoutLogin");
    } else {
      let checkoutData = {
        items: cart?.cartItems?.map((product) => ({
          productId: product.productId,
          selectedColor: product.color,
          selectedSize: product.size,
          quantity: product.quantity,
        })),
      };

      if (isSignedIn) {
        checkoutData.userId = user.id; // ClerkJS provides the user ID in the user object
      } else if (isGuest) {
        checkoutData.guestEmail =
          isGuest; /* Your logic to retrieve the guest's email here */
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        checkoutData
      );

      if (response && response.status === 200) {
        // Order processed successfully
        localStorage.removeItem("guestEmail");
        window.location = response.data.url;
      }
    }
  };
  useEffect(() => {
    if (searchParams.get("success")) {
      console.log("payment completed.......");
    }
    if (searchParams.get("canceled")) {
      console.log("something went wrong");
    }
  }, [searchParams]);
  return (
    <>
      <div className="mt-20  flex flex-col  md:hidden">
        <div className=" flex items-start justify-center">
          <h3 className=" font-FuturaMedium text-black tracking-widest text-lg ">
            Shopping Bag ({cartItemCount}){" "}
          </h3>
        </div>
        <hr className="mt-4 mb-4 border mx-6 text-black"></hr>
        <div className="flex items-start justify-center">
          <button className="w-full bg-black text-white mx-7 p-2 font-FuturaMedium text-lg tracking-widest">
            <Link href="/checkoutPage">Proceed to Checkout</Link>
          </button>
        </div>
        <hr className="mt-7 mb-4 w-full border  text-black"></hr>
        <div className="">
          {cart?.cartItems?.length === 0 ? (
            <h3 className="text-center justify-center text-lg mt-16 text-black">
              No Items in Bag
            </h3>
          ) : (
            cart?.cartItems?.map((product, productIdx) => (
              <div className=" flex flex-col" key={productIdx}>
                <div className=" flex items-center justify-center p-4 pt-4">
                  <Image
                    src={product.image}
                    width={500}
                    height={500}
                    alt={product.name}
                    className=" w-32"
                  />
                </div>
                <div className=" text-black ml-12 mt-12 ">
                  <div className="text-black">
                    <h2 className=" font-FuturaBold tracking-widest font-light text-sm mb-0 mt-3">
                      {product.name}
                    </h2>
                    <p className="font-FuturaMedium  font-extralight text-gray-700 tracking-wide text-sm">
                      {product.color} {product.description}
                    </p>
                    <p className="font-FuturaMedium text-gray-700   mb-2 text-sm">
                      Size: {product.size}
                    </p>
                    <span className=" font-FuturaBold text-sm">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex  mt-2  ">
                    <div className="flex space-x-2  items-center">
                      <button className="font-FuturaMedium text-gray-700 underline py-1 text-sm">
                        Edit
                      </button>
                      <div className="border-l h-[12px] border-gray-950 mx-2"></div>{" "}
                      {/* Separator */}
                      <button
                        className="font-FuturaMedium text-gray-700 underline py-1 text-sm "
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
                    <div className="relative top-4 ml-40">
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
                <hr className="mt-7 mb-0 border mx-0 text-black"></hr>
              </div>
            ))
          )}
        </div>
        <div className=" flex flex-col  text-black pb-12  bg-gray-100 pt-10 p-4  ">
          <h3 className=" font-FuturaBold tracking-widest text-lg">
            BASKET TOTAL ({cartItemCount} Items)
          </h3>
          <div className="flex px-3 mt-7 justify-between font-FuturaMedium tracking-widest text-xs text-gray-900">
            <span>Subtotal</span>
            <span>${amountWithoutTaxStr}</span>
          </div>
          <div className="flex px-3 mt-7 justify-between font-FuturaMedium tracking-widest text-xs text-gray-900">
            <span>Shipping</span>
            <span>$0(DHL)V</span>
          </div>
          <hr className="my-2 border-t border-gray-300" />
          <div className=" flex justify-between mt-2 px-3 font-FuturaBold text-lg tracking-widest">
            <span>Total</span>
            <span>${totalAmountStr}</span>
          </div>
          <hr className="my-2 border-t border-gray-300" />
          <span className=" font-FuturaLight text-[10px] px-2 text-center text-gray-500">
            By proceeding with this payment,you accept the{" "}
            <Link href="#" className="  border-b border-gray-900">
              General terms and Conditions of sale
            </Link>{" "}
            and the{" "}
            <Link href="#" className="  border-b border-gray-900">
              Privacy Policy
            </Link>
          </span>
          <button className=" w-full bg-black text-white  mt-4 p-2 font-FuturaMedium text-lg tracking-widest">
            <Link href="/checkoutPage">Proceed to Checkout</Link>
          </button>
          <div className="mt-12  flex items-center justify-center">
            <Link
              href="#"
              className="text-gray-600 border-b-2    border-gray-400 mx-28  pb-2 font-FuturaBold text-sm text-center  tracking-widest"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* large screen views */}
      <div className="mt-24 md:mb-40 hidden md:flex md:flex-col ">
        <div className=" flex items-center justify-center mb-8 md:mr-44  md:pr-44  ">
          <h3 className="font-FuturaMedium text-sm text-black">
            MY SHOPPING BAG
          </h3>
        </div>
        <div className="flex ">
          <div className="w-1/2 flex flex-col ml-4  pt-5 text-black h-[240px] pl-16">
            <div className="flex ml-16  justify-between  ">
              <h3 className=" lg:ml-20 font-FuturaMedium text-gray-700 text-xs">
                YOUR ITEMS
              </h3>
              <span className=" font-FuturaMedium text-gray-300 text-xs">
                continue shopping
              </span>
            </div>
            <hr className=" md:ml-16 lg:ml-36 mt-5 "></hr>
            <div className="max-h-[300px] overflow-auto  w-full  flex flex-col items-center ml-[61px] ">
              {cart?.cartItems?.length === 0 ? (
                <h3 className="text-center justify-center text-lg mt-16 text-black">
                  No Items in Bag
                </h3>
              ) : (
                cart?.cartItems?.map((product, productIdx) => (
                  <div className="flex mt-7   " key={productIdx}>
                    {/* Product Image */}
                    <div className=" w-[120px] lg:w-[120px] md: md:h-[132px] p-3 bg-customColor flex items-center justify-center">
                      <Image
                        src={product.image}
                        width={500}
                        height={500}
                        alt={product.name}
                        className=" w-32"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="pl-2 md:w-[200px]  lg:w-[280px] flex flex-col  ">
                      <div>
                        <h2 className="font-FuturaMedium tracking-wide font-light text-xs mb-0 mt-3">
                          {product.name}
                        </h2>
                        <p className="font-FuturaMedium text-gray-600 font-extralight tracking-tighter text-[12px]">
                          {product.color} {product.description}
                        </p>
                        <p className="font-FuturaMedium text-gray-600  mb-2 text-[12px]">
                          Size: {product.size}
                        </p>
                        <span className="font-FuturaMedium  text-[10px]">
                          ${(product.price / 100).toFixed(2)}
                        </span>
                      </div>

                      {/* Edit, Remove, and Quantity Selector */}
                      <div className="flex  mt-0 justify-between ">
                        <div className="flex space-x-2 mr-12 items-center">
                          <button className="font-FuturaMedium text-black underline py-1 text-[10px]">
                            Edit
                          </button>
                          <div className="border-l h-[12px] border-gray-950 mx-2"></div>{" "}
                          {/* Separator */}
                          <button
                            className="font-FuturaMedium text-black underline py-1 text-[10px] "
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
                        <div className="relative md:ml-0 lg:ml-32 -top-4 ">
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
                            {[...Array(product.stock).keys()].map(
                              (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
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
          </div>
          <div className="w-[250px] flex flex-col  ml-24 text-black bg-gray-100   p-4">
            <div>
              <h3 className=" mt-2 font-FuturaBold text-xs">BASKET TOTAL</h3>
            </div>

            <div className="flex p-1 mt-2 justify-between font-FuturaMedium text-xs text-gray-900">
              <span>Subtotal</span>
              <span>${amountWithoutTaxStr}</span>
            </div>
            <hr className="my-2 border-t border-gray-300" />
            <div className=" flex justify-between mt-2 p-1 font-FuturaBold text-sm">
              <span>Total</span>
              <span>${totalAmountStr}</span>
            </div>
            <hr className="my-2 border-t border-gray-300" />
            <div>
              <button className=" mt-10 bg-black text-white w-full p-[9px] text-xs font-FuturaLight tracking-widest">
              {isSignedIn && (
              <Link
                href={cart?.cartItems?.length > 0 ? "/checkoutPage" : "#!"}
                onClick={toggleDrawerBag}
              >
                Proceed to Checkout
              </Link>
            )}
            {!isSignedIn && (
              <Link
                href={cart?.cartItems?.length > 0 ? "/checkoutLogin" : "#!"}
                onClick={toggleDrawerBag}
              >
                Proceed to Checkout
              </Link>
            )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <PromotionBanner text={text} />
      </div>
    </>
  );
};

export default Cart;
