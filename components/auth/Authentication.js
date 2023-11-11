"use client";
import { useState } from "react";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";

const Authentication = ({redirectPath = "/" }) => {
  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between sign in and sign up

  return (
    <div className=" mx-auto mt-28 w-[300px] md:w-[350px] text-black mb-24 border ">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 ${
              isSignIn
                ? "bg-gray-100 font-FuturaBold text-xs text-gray-700"
                : "font-FuturaBold text-xs text-gray-400"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            SIGN IN
          </button>
          <button
            className={`flex-1 py-4 ${
              !isSignIn
                ? "bg-gray-100 font-FuturaBold text-xs text-gray-700"
                : "font-FuturaBold text-xs text-gray-400"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            CREATE ACCOUNT
          </button>
        </div>
        <div className="p-0">
          {isSignIn ? (
            // Sign In Form
            <SignIn redirectPath = {redirectPath} />
          ) : (
            // Sign Up Form
            <SignUp />
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
