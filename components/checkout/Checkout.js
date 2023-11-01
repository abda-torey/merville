"use client";
import React, { useState, useEffect,useContext } from "react";
// import React, { useState, useEffect, useContext, useRef } from "react";
import CartContext from "@/app/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState("");
  const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  // create checkout data from cart context to be passed to payment intent
  let checkoutData = {
    items: cart?.cartItems?.map((product) => ({
      productId: product.productId,
      selectedColor: product.color,
      selectedSize: product.size,
      quantity: product.quantity,
      price: product.price,
    })),
  };
  const creatPaymentIntent = async () => {
    // console.log(checkoutData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutData: checkoutData }),
        }
      );

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // React.useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  const appearance = {
    theme: "stripe",
    
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-md">
        {/* Multi-step Navigation */}
        <div className="mb-6 flex justify-between">
          <div
            className={`px-3 py-2 ${
              step === 1
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setStep(1)}
          >
            1. Shipping
          </div>
          <div
            className={`px-3 py-2 ${
              step === 2
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setStep(2)}
          >
            2. Payment Method
          </div>
          <div
            className={`px-3 py-2 ${
              step === 3
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setStep(3)}
          >
            3. Order Confirmation
          </div>
        </div>

        {/* Steps */}
        {step === 1 && (
          <div>
            <form>
              <div className="md:flex md:space-x-8">
                <div className="md:w-1/2">
                  <h2 className="mb-4 font-semibold">NEW ADDRESS</h2>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <select className="p-2 border rounded-md">
                      <option value="mr">Mr.</option>
                      <option value="ms">Ms.</option>
                      {/* Add other titles as needed */}
                    </select>
                    <div className="col-span-2 md:col-span-1">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Surname"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Address Line 1"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Address Line 2"
                    />
                  </div>
                  <h2 className="mt-6 mb-4 font-semibold">SHIPPING METHOD</h2>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="mr-2"
                        name="shipping"
                        value="uk"
                      />
                      UK SHIPPING - Free
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="mr-2"
                        name="shipping"
                        value="worldwide"
                      />
                      WORLDWIDE SHIPPING - £40
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      setStep(2);
                      creatPaymentIntent();
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className=" bg-customColor p-8 font-FuturaLight w-full">
            {/* ... Your payment form inputs go here ... */}
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
            {/* <button
              onClick={() => setStep(3)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Confirm Order
            </button> */}
          </div>
        )}

        {step === 3 && (
          <div>{/* ... Your order confirmation details go here ... */}</div>
        )}
      </div>
    </div>

    // <div className="App">
    //   {clientSecret && (
    //     <Elements options={options} stripe={stripePromise}>
    //       <CheckoutForm />
    //     </Elements>
    //   )}
    // </div>
  );
}
