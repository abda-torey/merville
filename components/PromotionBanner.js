import React from "react";

const PromotionBanner = ({ text }) => {
  return (
    // components/PromotionalBanner.js

    <div className="relative overflow-hidden   flex items-center h-9 bg-black text-white uppercase">
      <div className="absolute animate-marquee mt-4 mb-2 text-xs font-FuturaLight">
        {text}
        <span className="mr-16"></span>
        {text}
        <span className="mr-16"></span>
        {text}
        <span className="mr-16"></span>
        {text}
        <span className="mr-16"></span>
        {text}
        <span className="mr-16"></span>
        {text}
        <span className="mr-16"></span>
        {text}
        <span className="mr-16"></span>
        {text}
        <span className="mr-16"></span>
      </div>
    </div>
  );
};

export default PromotionBanner;
