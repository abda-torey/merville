"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCodeMessage, setErrorCodeMessage] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp
        .create({
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          password,
        })
        .then((res) => console.log("response", res))
        
        .catch((err) => setErrorMessage(err.errors[0].message));

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Verify User Email Code
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        // console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      // console.error(JSON.stringify(err, null, 2));
      setErrorCodeMessage(err.errors[0].longMessage);
    }
  };

  return (
    <div className="  flex justify-center items-start ">
      <div className="      p-4 text-black" style={{ width: "300px" }}>
        <h1 className="text-lg mb-4 font-FuturaBold tracking-widest text-gray-600 ">
          Create account
        </h1>
        {!pendingVerification && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-2 text-xs font-FuturaBold tracking-widest"
          >
             <div className="">
              <label htmlFor="email" className="block mb-2  text-gray-900">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                placeholder=""
                required={true}
              />
            </div>
            <div className="">
              <label htmlFor="password" className="block mb-2  text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 sm:text-sm block w-full p-2"
                required={true}
              />
            </div>
            <div className=" mb-4">
              <label
                htmlFor="first_name"
                className="block mb-2    text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                required={true}
              />
            </div>
            <div className="">
              <label htmlFor="last_name" className="block mb-2  text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                required={true}
              />
            </div>
           
            
            {errorMessage && (
              <p className="text-red-500 mt-2 font-FuturaLight tracking-wider text-xs italic">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              className={`w-full mb-4 text-white ${
                isChecked ? "bg-gray-900 hover:bg-gray-700" : "bg-gray-400"
              } font-medium text-xs px-5 py-3 text-center`}
              disabled={!isChecked}
            >
              SUBMIT
            </button>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeCheckbox"
                className="mr-2"
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              />
              <label
                htmlFor="agreeCheckbox"
                className="text-gray-600 text-[10px] tracking-tighter font-FuturaMedium"
              >
                I agree to the{" "}
                <Link href="/terms-and-conditions" className="underline">
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline">
                  privacy policy
                </Link>
              </label>
            </div>
          </form>
        )}
        {pendingVerification && (
          <div>
            <form className="space-y-4 md:space-y-6">
              <input
                value={code}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Verification Code..."
                onChange={(e) => setCode(e.target.value)}
              />
              {errorCodeMessage && (
              <p className="text-red-500 mt-2 font-FuturaMedium  tracking-wider text-xs italic">
                {errorCodeMessage}
              </p>
            )}
              <button
                type="submit"
                onClick={onPressVerify}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-FuturaMedium text-sm px-5 py-2.5 text-center"
              >
                Verify Email
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
