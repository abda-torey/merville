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
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    surname: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    postalCode: "",
    county: "",
    phoneNumber: "",
    shippingMethod: "",
  });

  const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "[{countryCode}] {countryNameEn}: +{countryCallingCode}"
  );

  // console.log(myCountryCodesObject);
  // code to select counties based on the country selected

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    // Update formData state with the selected country
    setFormData((prevData) => ({
      ...prevData,
      country: country,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: undefined,
    }));

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

  // Use useEffect to set the default state based on the screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    };

    // Call handleResize once on component mount to set initial state
    handleResize();

    // Set up event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
      console.log(data.orderId);
      localStorage.setItem("orderId", JSON.stringify(data.orderId));
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

  // validate formdata for areas that are required in the shipping information

  const validateFormData = () => {
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!formData.surname) {
      newErrors.surname = "Surname is required.";
    }
    if (!formData.addressLine1) {
      newErrors.addressLine1 = "Address Line 1 is required.";
    }
    if (!formData.country) {
      newErrors.country = "Country is required.";
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
    }
    if (!formData.postalCode) {
      newErrors.postalCode = "Postal Code is required.";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
    }
    if (!formData.shippingMethod) {
      newErrors.shippingMethod = "Shipping Method is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="bg-white mt-8 flex flex-col md:flex-row p-6">
      <div className=" order-2 md:order-1 w-full  md:w-[650px]  md:mr-0 ml-0 md:ml-12 p-2 md:p-8">
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

                  <div className="grid grid-cols-1  md:grid-cols-5 font-FuturaLight font-semibold text-xs gap-1 md:gap-2 mb-4">
                    <div className="  md:w-14  col-span-1 ">
                      <select className=" w-full md:w-14  p-2 border">
                        <option value="mr">Mr.</option>
                        <option value="ms">Ms.</option>
                        {/* Add other titles as needed */}
                      </select>
                    </div>
                    <div className=" w-full col-span-1 md:col-span-2 ">
                      <input
                        type="text"
                        className=" w-full  md:w-full p-2 border   "
                        placeholder="First Name"
                        autoComplete="name"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            firstName: e.target.value,
                          }));
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            firstName: undefined,
                          }));
                        }}
                      />
                      {errors.firstName && (
                        <div className="  text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className=" w-full col-span-1 md:col-span-2">
                      <input
                        type="text"
                        className=" w-full md:w-full p-2 border "
                        placeholder="Surname"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            surname: e.target.value,
                          }));
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            surname: undefined,
                          }));
                        }}
                      />
                      {errors.surname && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.surname}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 font-FuturaLight font-semibold text-xs ">
                    <input
                      type="text"
                      className="md:w-full w-[100%] p-2 border"
                      autoComplete="address-line1"
                      placeholder="Address Line 1"
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          addressLine1: e.target.value,
                        }));
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          addressLine1: undefined,
                        }));
                      }}
                    />
                    {errors.addressLine1 && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.addressLine1}
                      </div>
                    )}
                  </div>
                  <div className="mb-4 font-FuturaLight font-semibold text-xs">
                    <input
                      type="text"
                      className="md:w-full w-[100%] p-2 border"
                      placeholder="Address Line 2"
                      autoComplete="address-line2"
                      onChange={(e) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          addressLine2: e.target.value,
                        }));
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          addressLine2: undefined,
                        }));
                      }}
                    />
                    {errors.addressLine2 && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.addressLine2}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap">
                    {/* First Row: Country and City */}
                    <div className="w-1/2 mr-0 md:mr-4 md:w-24  flex-grow">
                      <select
                        value={formData.country}
                        onChange={handleCountryChange}
                        className="w-[90%] md:w-32 text-xs md:text-sm p-2 border"
                      >
                        <option value="">Country</option>
                        {allCountries.map((countryData, index) => (
                          <option key={index} value={countryData[0]}>
                            {countryData[0]}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.country}
                        </div>
                      )}
                    </div>

                    <div className="w-1/2 md:w-1/5  md:ml-4  flex-grow">
                      <input
                        type="text"
                        className="w-full text-xs md:text-sm p-2 border"
                        name="city"
                        placeholder="City"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            city: e.target.value,
                          }));
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            city: undefined,
                          }));
                        }}
                      />
                      {errors.city && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.city}
                        </div>
                      )}
                    </div>

                    {/* Second Row: Postal Code and Region */}
                    <div className="mt-4 md:mt-0  w-1/3  md:w-1/5 ml-0 md:ml-2  flex-grow">
                      <input
                        type="text"
                        className=" w-full md:w-full text-xs md:text-sm p-2 border"
                        name="postal-code"
                        placeholder="Postal Code"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            postalCode: e.target.value,
                          }));
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            postalCode: undefined,
                          }));
                        }}
                      />
                      {errors.postalCode && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.postalCode}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 md:mt-0  w-1/3 md:w-1/6 ml-2   flex-grow">
                      <select className=" w-full md:w-full text-xs md:text-sm p-2 border">
                        <option value="">Region</option>
                        {counties.map((region, index) => (
                          <option key={index} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                      {/* Assuming there's a potential error for county, you can add an error div here similarly */}
                    </div>
                  </div>

                  <div className="flex mt-4 gap-4 mb-4 font-FuturaLight font-semibold text-xs">
                    <div>
                      <input
                        type="text"
                        className="w-16 p-2 border"
                        autoComplete="tel-extension"
                        readOnly // Make the input read-only
                        value={`+${phoneExtension}`} // Display the phone extension value here
                      />
                    </div>
                    <div className="flex-grow">
                      <input
                        type="text"
                        className="w-full p-2 border"
                        autoComplete="tel"
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            phoneNumber: e.target.value,
                          }));
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            phoneNumber: undefined,
                          }));
                        }}
                      />
                      {errors.phoneNumber && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>
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
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            shippingMethod: e.target.value,
                          }));
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            shippingMethod: undefined,
                          }));
                        }}
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
                        onChange={(e) =>
                          setFormData((prevState) => ({
                            ...prevState,
                            shippingMethod: e.target.value,
                          }))
                        }
                      />
                      WORLDWIDE SHIPPING - £40
                    </label>
                    {errors.shippingMethod && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.shippingMethod}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default form submit
                      if (validateFormData()) {
                        setStep(2);
                        creatPaymentIntent();
                      } else {
                      }
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
      <div className="order-1 md:order-2 w-full  md:w-[350px] p-4 mt-12">
        <div className="text-black">
          <div className=" flex justify-between md:text-center">
            <h3
              className={` md:text-center font-FuturaMedium ${
                window.innerWidth < 768 ? "cursor-pointer" : ""
              }`}
              onClick={() =>
                window.innerWidth < 768 && setIsCollapsed(!isCollapsed)
              }
            >
              Your Order Summary
            </h3>
            <span className=" block md:hidden font-FuturaBold">
              ${amountWithoutTax}
            </span>
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-grow overflow-y-auto h-80 ">
                {cart?.cartItems?.length === 0 ? (
                  <h3 className="text-center justify-center font-FuturaLight text-lg mt-16 text-black">
                    No Items in Bag
                  </h3>
                ) : (
                  cart?.cartItems?.map((product, productIdx) => (
                    <div className="flex mt-7  " key={productIdx}>
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
                )}{" "}
              </div>
              <div className="border md:w-[350px] bg-gray-100 mt-8 text-xs p-4 ">
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
            </>
          )}
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
