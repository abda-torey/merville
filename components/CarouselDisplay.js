import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import CarouselComponent from "./CarouselComponent";
import CustomVideo from "./CustomVideo";

const media = [
  { type: 'video', src: '/RPReplay_Final1681840287.mov' },
  { type: 'image', src: '/Football.png' },
  { type: 'image', src: '/T shirt Beauty and the Beast.png' },
 
  // ... add more media as needed
];
const CarouselDisplay = () => {
  return (
    <div>
    <CarouselComponent media={media} />
  </div>
  );
};

export default CarouselDisplay;
