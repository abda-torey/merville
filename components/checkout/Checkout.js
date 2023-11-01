"use client";
import React, { useState, useEffect, useContext } from "react";
// import React, { useState, useEffect, useContext, useRef } from "react";
import CartContext from "@/app/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import localFont from "next/font/local";
import CheckoutForm from "./CheckoutForm";
import Image from "next/image";

import { allCountries } from "country-region-data";
const countryCodes = require("country-codes-list");

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const futuraMedium = localFont({
  src: "../../public/fonts/futura medium bt.ttf",
  variable: "--font-futura-medium",
});
export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState("");
  const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [counties, setCounties] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [phoneExtension, setPhoneExtension] = useState("EXT");

  const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "[{countryCode}] {countryNameEn}: +{countryCallingCode}"
  );

  // console.log(myCountryCodesObject);
  // code to select counties based on the country selected

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    // Find the country by its name
    const foundCountryData = allCountries.find((item) => item[0] === country);
    if (foundCountryData) {
      // Use map to extract region names and set the state variable
      const regionNames = foundCountryData[2].map((item) => item[0]);
      setCounties(regionNames);
      setCountryData(foundCountryData); // Set the country data state variable
    }
  };
  const updatePhoneExt = () => {
    let countryCode = null;

    // Iterate through the keys (country codes) and find the matching country name
    for (const code in myCountryCodesObject) {
      const entry = myCountryCodesObject[code];

      const parsedEntry = /(\[.*\]) (.+): \+(\d+)/.exec(entry);

      if (parsedEntry && parsedEntry[2] === selectedCountry) {
        const countryCode = code;
        setPhoneExtension(parsedEntry[3]);

        break;
      }
    }
  };

  useEffect(() => {
    // You can use countryData here, if it's not null
    if (countryData) {
      // Use map to extract region names and set the state variable
      const regionNames = countryData[2].map((item) => item[0]);
      setCounties(regionNames);
    }
    updatePhoneExt();
  }, [countryData]);

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
  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = (amountWithoutTax * 0.15).toFixed(2);
  const totalAmount = Number(amountWithoutTax) + Number(tax);
  return (
    <div className="bg-white mt-8 flex  p-6">
      <div className=" w-[650px] ml-12 p-8 ">
        {/* Multi-step Navigation */}
        <div className="mb-6 flex font-FuturaHeavy text-xs">
          <div
            className={`px-3 mr-8 py-2 ${
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
        </div>

        {/* Steps */}
        {step === 1 && (
          <div>
            <form>
              <div className="flex  bg-customColor p-4 text-black font-FuturaLight">
                <div className="md:w-full ">
                  <h2 className="mb-4 font-FuturaMedium">NEW ADDRESS</h2>

                  <div className="grid grid-cols-5 font-FuturaLight font-semibold text-xs gap-2 mb-4">
                    <select className="p-2 border col-span-1">
                      <option value="mr">Mr.</option>
                      <option value="ms">Ms.</option>
                      {/* Add other titles as needed */}
                    </select>
                    <div className=" col-span-2">
                      <input
                        type="text"
                        className="w-full p-2 border "
                        placeholder="First Name"
                        autoComplete="name"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <input
                        type="text"
                        className="w-full p-2 border "
                        placeholder="Surname"
                      />
                    </div>
                  </div>

                  <div className="mb-4 font-FuturaLight font-semibold text-xs ">
                    <input
                      type="text"
                      className="w-full p-2 border"
                      autoComplete="address-line1"
                      placeholder="Address Line 1"
                    />
                  </div>
                  <div className="mb-4 font-FuturaLight font-semibold text-xs">
                    <input
                      type="text"
                      className="w-full p-2 border"
                      placeholder="Address Line 2"
                      autoComplete="address-line2"
                    />
                  </div>
                  <div className="flex">
                    <select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className=" w-32 p-2 border mr-2" // added width and margin
                    >
                      <option value="">Country</option>
                      {allCountries.map((countryData, index) => (
                        <option key={index} value={countryData[0]}>
                          {countryData[0]}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      className="w-40 p-2 border mr-2" // added width and margin
                      name="city"
                      placeholder="City"
                    />

                    <input
                      type="text"
                      className="w-1/4 p-2 border mr-2" // added width and margin
                      name="postal-code"
                      placeholder="Postal Code"
                    />

                    <select className="w-28 p-2 border">
                      <option value="">COUNTY</option>
                      {counties.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex mt-4 gap-4 mb-4 font-FuturaLight font-semibold text-xs">
                    <input
                      type="text"
                      className="w-16 p-2 border"
                      autoComplete="tel-extension"
                      readOnly // Make the input read-only
                      value={`+${phoneExtension}`} // Display the phone extension value here
                    />
                    <input
                      type="text"
                      className="w-full p-2 border"
                      autoComplete="tel"
                      placeholder="Phone Number"
                    />
                  </div>

                  <h2 className="mt-6 mb-4 font-FuturaLight  text-sm">
                    SHIPPING METHOD
                  </h2>
                  <div className="mb-4">
                    <label className="flex items-center font-FuturaLight text-xs">
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
                    <label className="flex items-center font-FuturaLight  text-xs">
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
                    className="mt-4 px-4 py-2 font-FuturaLight text-xs bg-black text-white "
                  >
                    CONTINUE TO PAYMENT
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
      </div>
      <div className="w-[400px] p-4 mt-12">
        <div className="flex-grow overflow-y-auto text-black">
          <h3 className=" text-center font-FuturaMedium ">
            Your Order Summary
          </h3>
          {cart?.cartItems?.length === 0 ? (
            <h3 className="text-center justify-center font-FuturaLight text-lg mt-16 text-black">
              No Items in Bag
            </h3>
          ) : (
            cart?.cartItems?.map((product, productIdx) => (
              <div className="flex mt-7 " key={productIdx}>
                {/* Product Image */}
                <div className=" w-[130px] h-[130px] p-4 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={product.image}
                    width={500}
                    height={500}
                    alt={product.name}
                    className=" w-24"
                  />
                </div>

                {/* Product Details */}
                <div className=" pl-4 w-[145px] flex flex-col">
                  <div>
                    <h2 className=" font-FuturaLight tracking-wide font-bold text-xs mb-2">
                      {product.name}
                    </h2>
                    <p className=" font-FuturaLight text-gray-600  text-xs">
                      Color: {product.color}
                    </p>
                    <p className="font-FuturaLight text-gray-600  mb-0  text-xs">
                      Size: {product.size}
                    </p>
                    <p className="font-FuturaLight text-gray-600  mb-0  text-xs">
                      Qty: {product.quantity}
                    </p>
                    <span className="font-FuturaLight text-gray-600  mb-3  text-xs">
                      £{product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="border w-[350px] bg-gray-100 mt-8 text-xs p-4 ">
            <div className="flex justify-between border-b font-FuturaMedium text-gray-800  pb-2">
              <span>Subtotal</span>
              <span>${amountWithoutTax}</span>
            </div>
            <div className="flex justify-between border-b pb-2 font-FuturaMedium text-xs  pt-2">
              <span>Shipping</span>
              <span>£0.00</span>
            </div>
            <div className="flex font-FuturaBold text-xs justify-between pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold">£{amountWithoutTax}</span>
            </div>
          </div>
        </div>
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
