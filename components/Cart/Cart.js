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

const Cart = () => {
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
  console.log(user);
  // const updateQuantity = (e, product) => {
  //   const item = { ...product, quantity: parseInt(e.target.value) };
  //   if (parseInt(e.target.value) > Number(product.stock)) return;
  //   addItemToCart(item);
  // };

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
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
      //   {
      //     items: cart?.cartItems?.map((product) => ({
      //       productId: product.productId,
      //       selectedColor: product.color,
      //       selectedSize: product.size,
      //       quantity: product.quantity,
      //     })),
      //   }
      // );
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
    // <div className="flex justify-center p-4 mr-8">
    //   <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
    //     <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
    //       Shopping Bag
    //     </h1>

    //     <div className="bg-white p-4 rounded-lg shadow-md">
    //       {cart?.cartItems?.map((product, productIdx) => (
    //         <div
    //           key={product.productId}
    //           className="flex justify-between items-center mb-4"
    //         >
    //           <div className="flex items-center">
    //             <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden mr-4">
    //               <Image
    //                 src={product.image}
    //                 alt={product.name}
    //                 width={500}
    //                 height={500}
    //                 className="object-cover"
    //               />
    //             </div>
    //             <div>
    //               <h3 className="text-md font-medium text-gray-700">
    //                 {product.name}
    //               </h3>
    //               <p className="text-sm text-gray-500">{product.color}</p>
    //               <p className="text-sm text-gray-500">{product.size}</p>
    //               <p className="mt-1 text-sm font-medium text-gray-900">
    //                 {product.price}
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex items-center">
    //             <select className="mr-4" value={product.quantity}>
    //               {[...Array(product.stock).keys()].map((_, idx) => (
    //                 <option key={idx} value={idx + 1}>
    //                   {idx + 1}
    //                 </option>
    //               ))}
    //             </select>
    //             <button className="text-gray-400 hover:text-gray-500">
    //               Remove
    //             </button>
    //           </div>
    //         </div>
    //       ))}

    //       <div className="border-t pt-4">
    //         <div className="flex justify-between items-center mb-2">
    //           <span className="text-gray-600">SUBTOTAL</span>
    //           <span>£9,90 GBP</span>
    //         </div>
    //         <button className="w-full bg-black text-white rounded-md py-2">
    //           VIEW BAG
    //         </button>
    //         <button className="w-full bg-black text-white rounded-md py-2 mt-2">
    //           CHECKOUT
    //         </button>
    //       </div>
    //     </div>

    //     {/* Optional: Add this below the cart items if you want to display a message for orders above a certain amount */}
    //     <div className="mt-6 text-center">
    //       <span className="text-sm text-gray-600">
    //         FREE SHIPPING FOR ORDERS ABOVE £200
    //       </span>
    //     </div>
    //   </div>
    // </div>

    <div className="mt-24 md:mb-40 flex flex-col  ">
      <div className=" flex items-start justify-center mb-8 mr-24 ">
        <h3 className=" font-FuturaMedium text-sm text-black">
          MY SHOPPING BAG
        </h3>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col   pt-5 text-black h-full">
          <div className="flex ml-24  justify-between  ">
            <h3 className=" ml-24 font-FuturaMedium text-gray-700 text-xs">
              YOUR ITEMS
            </h3>
            <span className=" font-FuturaMedium text-gray-300 text-xs">
              continue shopping
            </span>
          </div>
          <hr className=" md:ml-44 mt-5"></hr>
          <div className="max-h-[300px] overflow-auto w-full flex flex-col items-center">
            {cart?.cartItems?.length === 0 ? (
              <h3 className="text-center justify-center text-lg mt-16 text-black">
                No Items in Bag
              </h3>
            ) : (
              cart?.cartItems?.map((product, productIdx) => (
                <div className="flex mt-7  " key={productIdx}>
                  {/* Product Image */}
                  <div className=" w-[100px] h-[100px] p-2 bg-customColor flex items-center justify-center">
                    <Image
                      src={product.image}
                      width={500}
                      height={500}
                      alt={product.name}
                      className=" w-32"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="pl-4 w-[120px] flex flex-col">
                    <div>
                      <h2 className=" font-FuturaMedium tracking-wide  text-xs mb-0">
                        {product.name}
                      </h2>
                      <p className=" font-FuturaLight text-gray-600  text-xs">
                        Color: {product.color}
                      </p>
                      <p className=" font-FuturaLight text-gray-600  mb-1 text-xs">
                        Size: {product.size}
                      </p>
                      <span className=" font-FuturaLight text-xs">
                        $ {product.price}
                      </span>
                    </div>

                    {/* Edit, Remove, and Quantity Selector */}
                    <div className="flex  mt-2 justify-between">
                      <div className="flex space-x-2">
                        <button className=" font-FuturaMedium text-gray-600 underline py-1 text-xs">
                          Edit
                        </button>
                        <div className="border-l h-6 border-gray-950 mx-2"></div>{" "}
                        {/* Separator */}
                        <button
                          className=" font-FuturaMedium text-gray-600 underline py-1 text-xs"
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
                      <div className="relative ml-6 md:ml-32 ">
                        <span className="absolute top-1/2 left-1  md:left-0.5 transform -translate-y-1/2 text-xs pointer-events-none">
                          QTY:
                        </span>
                        <select
                          className=" appearance-none border p-2 text-xs pl-6 w-14" // Adjusted padding, width, and removed unnecessary padding
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
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none"
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
        <div className="w-[200px] flex flex-col  ml-14 text-black bg-customColor  p-3">
          <div>
            <h3 className=" mt-2 font-FuturaBold text-xs">BASKET TOTAL</h3>
          </div>

          <div className="flex p-1 mt-2 justify-between font-FuturaMedium text-xs text-gray-600">
            <span>Subtotal</span>
            <span>${amountWithoutTax}</span>
          </div>

          <div className=" flex justify-between mt-2 p-1 font-FuturaBold text-xs">
            <span>Total</span>
            <span>${totalAmountStr}</span>
          </div>
          <div>
            <button
              className=" mt-12 bg-black text-white w-full p-1 text-xs font-FuturaLight tracking-widest"
              onClick={onCheckOut}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
