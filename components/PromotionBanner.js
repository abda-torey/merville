import React from "react";

const PromotionBanner = ({ text }) => {
  return (
    // components/PromotionalBanner.js

    <div className="relative overflow-hidden   flex items-center h-12  bg-black text-white uppercase">
      <div className="absolute animate-marquee mt-4 mb-3  text-[10px] tracking-widest font-FuturaMedium opacity-75 ">
        {text}
        <span className="mr-20"></span>
        {text}
        <span className="mr-20"></span>
        {text}
        <span className="mr-20"></span>
        {text}
        <span className="mr-20"></span>
        {text}
        <span className="mr-20"></span>
        {text}
        <span className="mr-20"></span>
        {text}
        <span className="mr-20"></span>
        {text}
        <span className="mr-20"></span>
        
      </div>
    </div>
  );
};

export default PromotionBanner;
