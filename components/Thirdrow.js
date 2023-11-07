"use client";
import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CustomVideo from "./CustomVideo";
import Image from "next/image";
import "./thirdrow.css";
import Link from "next/link";

const media = [
  {
    src: "/PENNYLOAFERS.png",
    title: "PENNY LOAFERS",
    bg_bottom: "bright",
    bg_top: "bright",
  },
  {
    src: "/Shoeplant.png",
    title: "MOKOKO HIGHTOP",
    bg_bottom: "dark",
    bg_top: "dark",
  },
  {
    src: "/Womenhill.png",
    title: "MOKOKO LOW TOP",
    bg_bottom: "dark",
    bg_top: "bright",
  },
  {
    src: "/Carpets.png",
    title: "CARPETS",
    bg_bottom: "bright",
    bg_top: "bright",
  },
];
const Thirdrow = () => {
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
  console.log(media[0].src);
  return (
    <div className="relative">
      <Carousel
        showArrows={false}
        showThumbs={false}
        renderIndicator={renderIndicator}
        autoPlay
        interval={4000}
        transitionTime={0}
        infiniteLoop
        swipeable={false} // Disable swipe gestures on mobile
      >
        {media.map((item, index) => {
          return (
            <div key={index} className="relative w-screen h-screen">
              <Image
                src={item.src}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                // objectPosition="center"
              />
              <h3
                className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl ${
                  item.bg_top === "bright" ? "text-black" : "text-white"
                } font-extrabold `}
              >
                {item.title}
              </h3>
              <Link
                href="#"
                className={`absolute bottom-8 left-1/3 md:bottom-5 md:left-1/2 transform -translate-x-1/2 text-xs tracking-widest font-FuturaBold no-underline border-b-2 ${
                  item.bg_bottom === "dark"
                    ? "text-white border-white"
                    : "text-black border-black"
                }`}
              >
                Explore More
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Thirdrow;
