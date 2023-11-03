// import { SignIn } from "@clerk/nextjs/app-beta";
import SignIn from "@/components/auth/signIn/SignIn";
import GuestEmail from "@/components/Cart/GuestEmail";
const CheckoutLogin = () => {
  return (
    <div className="flex mt-12 items-start justify-center space-x-6  ">
      <div className="w-1/3 ml-24">
        <SignIn redirectPath ="/cart"  />
      </div>
      <div className="mt-32  text-red-500 font-bold mr-10 ">OR</div>
      <div className="w-1/3 text-black">
        <GuestEmail />
      </div>
    </div>
  );
};

export default CheckoutLogin;
