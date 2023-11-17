"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignIn({ redirectPath = "/" }) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      console.log(err);
      setErrorMessage(err.errors[0].longMessage);
    }
  };

  return (
    <div className=" flex justify-center items-start">
      <div
        className="bg-white p-2  font-futura tracking-wider  "
        style={{ width: "300px" }}
      >
        {" "}
        {/* added shadow, padding, rounded corners and fixed width */}
        <div className="mb-4 text-start">
          {" "}
          {/* centered the text */}
          <span className=" font-FuturaBold tracking-widest text-center text-lg text-gray-500 cursor-pointer hover:underline">
            My Account
          </span>{" "}
          {/* added hover effect */}
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-FuturaBold tracking-widest text-gray-500"
            >
              Email Address
            </label>{" "}
            {/* styled label */}
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-gray-300 font-FuturaMedium tracking-wider  focus:outline-none focus:border-blue-500"
            />
           
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-xs font-FuturaBold tracking-widest text-gray-500"
              >
                Password
              </label>
              <div className="text-xs text-gray-400 cursor-pointer tracking-widest font-FuturaBold hover:underline">
                Forgot Password?
              </div>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              className="w-full p-2 mt-2 border border-gray-300  tracking-wider focus:outline-none focus:border-blue-500"
            />
            {errorMessage && (
              <p className="text-red-500 mt-2 font-FuturaLight tracking-wider text-xs italic">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white p-3 mb-8 font-FuturaBold text-xs tracking-widest  hover:bg-gray-800"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
