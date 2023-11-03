"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignIn({redirectPath = '/'}) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // start the sign In process.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push(redirectPath);
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err) {
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <div className="mt-24 flex justify-center items-start  md:mb-24">
      <div
        className="bg-white p-6 font-futura tracking-wider shadow-md "
        style={{ width: "300px" }}
      >
        {" "}
        {/* added shadow, padding, rounded corners and fixed width */}
        <div className="mb-4 text-start">
          {" "}
          {/* centered the text */}
          <span className=" font-FuturaBold  text-center text-sm text-gray-500 cursor-pointer hover:underline">
            My Account
          </span>{" "}
          {/* added hover effect */}
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-FuturaMedium text-gray-500"
            >
              Email Address
            </label>{" "}
            {/* styled label */}
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-gray-300  focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-xs font-FuturaMedium text-gray-500"
              >
                Password
              </label>
              <div className="text-xs text-gray-400 cursor-pointer font-FuturaMedium hover:underline">
                Forgot Password?
              </div>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              className="w-full p-2 mt-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white p-2  hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
