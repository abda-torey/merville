"use client";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GuestEmail = () => {
  const [guestEmail, setGuestEmail] = useState("");
  const router = useRouter();

  const handleGuestCheckout = () => {
    // Save the email somewhere (e.g., in local storage or context)
    localStorage.setItem("guestEmail", guestEmail);
    console.log(guestEmail);
    router.push("/checkoutPage");
  };

  return (
    <div className="flex flex-col   px-0 mt-28">
      <div className=" flex items-center justify-center">
      <label className="block text-xs font-FuturaBold text-gray-700">
        Checkout as guest
      </label>
      </div>
      
      <input
        type="email"
        value={guestEmail}
        onChange={(e) => setGuestEmail(e.target.value)}
        placeholder="Enter your email"
        className="mt-1 p-2 w-full border "
      />
      <div className="flex items-center justify-center">
        <button
          onClick={handleGuestCheckout}
          className="mt-4 px-4 py-2 bg-black font-FuturaMedium text-xs  text-white "
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default GuestEmail;
