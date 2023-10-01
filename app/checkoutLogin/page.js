import { SignIn } from "@clerk/nextjs/app-beta";
import GuestEmail from "@/components/Cart/GuestEmail";
const CheckoutLogin = () => {
  return (
    <div className="flex items-center space-x-6 mt-24">
      <div className="w-1/2">
        <SignIn afterSignInUrl="/cart" afterSignUpUrl="/cart" />
      </div>
      <div className="text-red-500 font-bold mr-10 ">OR</div>
      <div className="w-1/2">
        <GuestEmail />
      </div>
    </div>
  );
};

export default CheckoutLogin;
