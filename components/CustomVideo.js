"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

const CustomVideo = ({isActive}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const handleVideoEnd = () => {
    setIsPlaying(false);
};
useEffect(() => {
  if (isActive) {
      videoRef.current.play();
      setIsPlaying(true);
  } else {
      videoRef.current.pause();
      setIsPlaying(false);
  }
}, [isActive]);

  return (
    <div className="relative w-full h-screen ">
      <video
        muted
        autoPlay
        playsInline
        ref={videoRef}
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
      >
        <source src="/finalVideo.webm" type="video/webm" />
        <source src="/finalVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <div className="absolute inset-0 flex flex-col bottom-20 gap-5 justify-end items-center"> */}
        <div className="absolute bottom-12 md:bottom-9 right-1 md:right-16 p-4">
        {/* The new header and button */}
        {/* <h2 className="text-xl font-semibold mb-2 text-white">Mercerize Tee</h2>
        <p className="text-l font-normal">
          LA BELLE ET LE MOCHE
        </p> */}
        {/* <span className=" text-center text-xs w-60 font-extralight"> 100% cotton mercerised Fabric with Print all over,280 gsm for a comfortable wear made to last long</span> */}
        <button className="text-white text-xs md:text-sm border-2 border-white px-1 md:px-2 py-1 md:py-2 bg-transparent focus:outline-none mb-2 w-16 md:w-24">
            DISCOVER
        </button>
    </div>
      <div className="absolute bottom-8 left-2 md:bottom-4 md:left-0 lg:bottom-4 lg:left-20 w-20 flex space-x-2 items-center gap-6  bg-opacity-60 p-2">
        <button onClick={toggleMute} className="text-white focus:outline-none p-2">
          {isMuted ? (
           <SpeakerXMarkIcon className="h-5 w-5" />
          ) : (
            <SpeakerWaveIcon className="h-5 w-5" />
          )}
        </button>
       
        <button
          onClick={togglePlayPause}
          className="text-white focus:outline-none p-2"
        >
          
          {isPlaying ? (
            <PauseIcon className="h-5 w-5 " />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </button>
        
      </div>
      
    </div>
  );
};

export default CustomVideo;
