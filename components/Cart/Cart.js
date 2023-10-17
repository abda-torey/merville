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
  const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const searchParams = useSearchParams();
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const isGuest = localStorage.getItem("guestEmail");
  console.log(user);
  const updateQuantity = (e, product) => {
    const item = { ...product, quantity: parseInt(e.target.value) };
    if (parseInt(e.target.value) > Number(product.stock)) return;
    addItemToCart(item);
  };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = (amountWithoutTax * 0.15).toFixed(2);
  const totalAmount = Number(amountWithoutTax) + Number(tax);

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
    <div className="flex justify-center p-4 mr-8">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
          Shopping Bag
        </h1>

        <div className="bg-white p-4 rounded-lg shadow-md">
          {cart?.cartItems?.map((product, productIdx) => (
            <div
              key={product.productId}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden mr-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-700">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.color}</p>
                  <p className="text-sm text-gray-500">{product.size}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <select className="mr-4" value={product.quantity}>
                  {[...Array(product.stock).keys()].map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </select>
                <button className="text-gray-400 hover:text-gray-500">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">SUBTOTAL</span>
              <span>£9,90 GBP</span>
            </div>
            <button className="w-full bg-black text-white rounded-md py-2">
              VIEW BAG
            </button>
            <button className="w-full bg-black text-white rounded-md py-2 mt-2">
              CHECKOUT
            </button>
          </div>
        </div>

        {/* Optional: Add this below the cart items if you want to display a message for orders above a certain amount */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            FREE SHIPPING FOR ORDERS ABOVE £200
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
