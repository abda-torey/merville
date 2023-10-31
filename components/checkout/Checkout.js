// "use client";
// import React from "react";
// import { useState, useEffect, useContext } from "react";
// import CartContext from "@/app/context/CartContext";
// import { Tab } from "@headlessui/react";
// import { countries } from "countries-list";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// const countryData = Object.entries(countries).map(([code, country]) => ({
//   code,
//   name: country.name,
//   phone: country.phone,
// }));

// const Checkout = () => {
//   const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext);
//   const [completedStep, setCompletedStep] = useState(0); // 0: Shipping, 1: Payment Method, 2: Order Confirmation
//   const [phoneExtension, setPhoneExtension] = useState("44");
//   const [clientSecret, setClientSecret] = useState("");
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [formData, setFormData] = useState({
//     title: "",
//     firstName: "",
//     surname: "",
//     address1: "",
//     address2: "",
//     city: "",
//     postalCode: "",
//     phoneNumber: "",
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const appearance = {
//     theme: 'stripe',
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };
//   let checkoutData = {
//     items: cart?.cartItems?.map((product) => ({
//       productId: product.productId,
//       selectedColor: product.color,
//       selectedSize: product.size,
//       quantity: product.quantity,
//       price:product.price,
//     })),
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log(checkoutData)
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(checkoutData),
//           }
//         );
//         const data = await response.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(clientSecret);
//   return (
//     <div className="bg-white py-6 flex flex-col justify-start sm:py-12">
//       <div className="relative py-3 w-1/2 mx-auto ">
//         <div className="relative mt-4 text-black">
//           <Tab.Group
//             selectedIndex={selectedIndex}
//             // onChange={setSelectedIndex}
//             onChange={(index) => {
//               console.log("Changed selected tab to:", index);
//               setSelectedIndex;
//             }}
//           >
//             <Tab.List className="flex p-1 space-x-8 bg-white ">
//               <Tab
//                 disabled={completedStep < 0}
//                 className="flex-1 py-2.5 text-sm leading-5 font-medium rounded-lg focus:ring focus:outline-none  ui-selected:text-black  ui-not-selected:text-gray-200"
//               >
//                 1. Shipping
//               </Tab>
//               <Tab
//                 disabled={completedStep < 1}
//                 className="flex-1 py-2.5 text-sm leading-5 font-medium rounded-lg focus:ring focus:outline-none ui-selected:text-black  ui-not-selected:text-gray-200"
//               >
//                 Payment Method
//               </Tab>
//               <Tab
//                 disabled={completedStep < 2}
//                 className="flex-1 py-2.5 text-sm leading-5 font-medium rounded-lg focus:ring focus:outline-none ui-selected:text-black  ui-not-selected:text-gray-200"
//               >
//                 Order Confirmation
//               </Tab>
//             </Tab.List>

//             <Tab.Panels className="mt-2">
//               <Tab.Panel>
//                 <div className="bg-customColor p-4 shadow-md space-y-4">
//                   <h2 className="text-xl font-medium">New Address</h2>

//                   <div className="flex space-x-4">
//                     <select
//                       className="w-1/3 border  p-2"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleInputChange}
//                     >
//                       <option>Mr.</option>
//                       <option>Mrs.</option>
//                       <option>Miss</option>
//                       <option>Non Identify</option>
//                     </select>
//                     <input
//                       className="w-1/3 border  p-2"
//                       placeholder="First Name"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                     />
//                     <input
//                       className="w-1/3 border  p-2"
//                       placeholder="Surname"
//                       name="surname"
//                       value={formData.surname}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <input
//                     className="w-full border  p-2"
//                     placeholder="Address Line 1"
//                     name="address1"
//                     value={formData.address1}
//                     onChange={handleInputChange}
//                   />
//                   <input
//                     className="w-full border  p-2"
//                     placeholder="Address Line 2"
//                     name="address2"
//                     value={formData.address2}
//                     onChange={handleInputChange}
//                   />

//                   <div className="flex space-x-4">
//                     <select
//                       className="w-1/4 border  p-2"
//                       onChange={(e) => {
//                         const selectedCountry = countryData.find(
//                           (country) => country.name === e.target.value
//                         );
//                         if (selectedCountry) {
//                           setPhoneExtension(selectedCountry.phone);
//                         }
//                       }}
//                     >
//                       <option>Country/Region</option>
//                       {countryData.map((country) => (
//                         <option key={country.code} value={country.name}>
//                           {country.name}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       className="w-1/4 border  p-2"
//                       placeholder="City"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                     />
//                     <input
//                       className="w-1/4 border  p-2"
//                       placeholder="Postal Code"
//                       name="postalCode"
//                       value={formData.postalCode}
//                       onChange={handleInputChange}
//                     />
//                     <select className="w-1/4 border  p-2">
//                       {/* Populate based on country region */}
//                       <option>County</option>
//                     </select>
//                   </div>

//                   <div className="flex space-x-4">
//                     <input
//                       className="w-1/4 border  p-2"
//                       value={`+${phoneExtension}`}
//                       readOnly
//                     />

//                     {/* This is a sample phone extension, change dynamically based on region */}
//                     <input
//                       className="w-3/4 border  p-2"
//                       placeholder="Phone Number"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <input type="checkbox" id="saveAddress" />
//                     <label htmlFor="saveAddress" className="text-sm">
//                       Save shipping address information to address book
//                     </label>
//                   </div>

//                   <h3 className="text-lg font-medium">SHIPPING METHOD</h3>

//                   <div className="flex flex-col space-y-2">
//                     <label className="flex items-center space-x-2">
//                       <input type="radio" name="shippingMethod" value="UK" />
//                       <span className="text-sm">UK Shipping - Free</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="shippingMethod"
//                         value="Worldwide"
//                       />
//                       <span className="text-sm">
//                         Worldwide Shipping - 40 pound
//                       </span>
//                     </label>
//                   </div>

//                   <button
//                     className="bg-blue-500 text-white mt-4 py-2 px-4 "
//                     onClick={() => {
//                       setSelectedIndex(1), setCompletedStep(1);
//                     }}
//                   >
//                     Continue to Payment
//                   </button>
//                 </div>
//               </Tab.Panel>

//               <Tab.Panel>
//                 <div className="bg-white p-4  rounded-xl shadow-md">
//                   {clientSecret && (
//                     <Elements options={options} stripe={stripePromise}>
//                       <CheckoutForm />
//                     </Elements>
//                   )}
//                   <button onClick={() => setCompletedStep(2)}>
//                     Complete Payment
//                   </button>
//                   <button onClick={() => setSelectedIndex(0)}>Go Back</button>
//                 </div>
//               </Tab.Panel>
//               <Tab.Panel>
//                 <div className="bg-white p-4 rounded-xl shadow-md">
//                   {/* Order Confirmation */}
//                   <p>Order confirmation details go here...</p>
//                 </div>
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab.Group>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
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
  const [clientSecret, setClientSecret] = useState("");
  const [step, setStep] = useState(1);
  const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext);

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
    console.log(checkoutData);
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
          <div>
            {/* ... Your payment form inputs go here ... */}
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
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
