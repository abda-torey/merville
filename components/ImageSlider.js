import React, { useState } from "react";
import Swipe from "react-swipe";

function ImageSlider({ imageDetails }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="relative w-68 h-[400px]">
      <Swipe
        swipeOptions={{
          continuous: true,
          callback: function (index, elem) {
            const activeImageId = imageDetails[index].publicId;
            setActiveIndex(activeImageId);
            console.log(activeImageId);
          },
        }}
      >
        {imageDetails.map((item) => (
          <div
            key={item.publicId}
            className="relative w-full h-full flex justify-center items-center overflow-hidden"
          >
            <img src={item.imageUrl} alt="" className="mt-20 w-64 max-h-full" />
          </div>
        ))}
      </Swipe>
      <div className="absolute bottom-4 left-0 right-0 flex justify-between">
        {imageDetails.map((item) => (
          <span
            key={item.publicId}
            className={`block flex-1 h-0.5 mx-1 ${
              activeIndex === item.publicId ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
