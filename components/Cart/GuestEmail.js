"use client"
import React from "react";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GuestEmail = () => {
    const [guestEmail, setGuestEmail] = useState("");
  const router = useRouter();

  const handleGuestCheckout = () => {
    // Save the email somewhere (e.g., in local storage or context) 
    localStorage.setItem('guestEmail', guestEmail);
    console.log(guestEmail)
    router.push('/checkoutPage');
  };

  return (
    <div className="px-0">
      <label className="block text-sm font-medium text-gray-700">
        Checkout as guest
      </label>
      <input
        type="email"
        value={guestEmail}
        onChange={(e) => setGuestEmail(e.target.value)}
        placeholder="Enter your email"
        className="mt-1 p-2 w-full border rounded-md"
      />
      <button
        onClick={handleGuestCheckout}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default GuestEmail;
