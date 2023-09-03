"use client";
import { Carousel } from "react-responsive-carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CustomVideo from "./CustomVideo";
import Image from "next/image";
import "./custom.css";

const CarouselComponent = ({ media }) => {
  const customPrevArrow = (onClickHandler, hasPrev, label) => {
    return (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 focus:outline-none ${
          !hasPrev && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!hasPrev}
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
    );
  };

  const customNextArrow = (onClickHandler, hasNext, label) => {
    return (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 focus:outline-none ${
          !hasNext && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!hasNext}
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    );
  };
  const renderIndicator = (onClickHandler, isSelected, index, label) => {
    return (
      <li
        className={`inline-block mx-1.5 rounded-full border transition-all duration-300 ${
          isSelected
            ? "border-gray-300 bg-transparent w-2.5 h-2.5"
            : "border-gray-400 w-2 h-2"
        } bg-gray-200`}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        title={`${label} ${index + 1}`}
        aria-label={`${label} ${index + 1}`}
      ></li>
    );
  };

  return (
    <div className="relative">
      <Carousel
        autoPlay
        interval={4000}
        transitionTime={0}
        infiniteLoop
        showArrows={true}
        showThumbs={false}
        renderArrowPrev={customPrevArrow}
        renderArrowNext={customNextArrow}
        renderIndicator={renderIndicator}
      >
        {media.map((item, index) => {
          return item.type === "video" ? (
            <CustomVideo key={index} />
          ) : (
            <div key={index}>
              <div>
                <Image src={item.src} alt="" layout="fill" objectFit="cover" />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <div className="absolute text-left items-start bottom-10 left-5 md:left-10 lg:left-64 flex flex-col gap-2 justify-end w-48">
                {/* The new header and button */}
                <h2 className="text-2xl font-bold mb-4 text-white">
                  SOCCER BALL
                </h2>
                <p className="text-l font-normal">PALAZO BALL</p>
                <span className="text-left text-xs w-60 font-light">
                  High quality heat Seamed pvc ball, made with high quality
                  material, this ball is of competitive standa
                </span>
                <button className="text-white text-sm border-2 border-white px-4 py-3 bg-transparent focus:outline-none w-36 md:w-48">
                  DISCOVER
                </button>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
