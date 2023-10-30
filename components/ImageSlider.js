"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageSlider({ imageDetails }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const customIndicator = (onClickHandler, isSelected, index, label) => {
    const bgColor = isSelected ? "bg-gray-600" : "bg-gray-200";
    return (
      <span
        key={index}
        className={`block flex-1 h-0.5 mx-0.5 ${bgColor}`}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        role="button"
        tabIndex={0}
      ></span>
    );
  };

  return (
    <div className="relative  w-full h-[350px]">
      <Carousel
        showStatus={false}
        onChange={handleSlideChange}
        showArrows={false}
        showThumbs={false}
        renderIndicator={false}
        // renderIndicator={customIndicator}
        transitionTime={300}
        infiniteLoop
      >
        {imageDetails.map((item) => (
          <div
            key={item.publicId}
            className=" mt-20 ml-12 w-64 flex items-center justify-center"
          >
            <Image
              src={item.imageUrl}
              width={500}
              height={500}
              alt="product image"
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute w-full bottom-2 left-0 right-0 flex space-x-0.5">
        {imageDetails.map((_, index) => (
          <span
            key={index}
            className={`block flex-grow h-0.5 ${
              index === activeIndex ? "bg-gray-600" : "bg-gray-200"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
