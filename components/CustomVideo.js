"use client";
import React, { useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

const CustomVideo = () => {
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
  return (
    <div className="relative h-[650px] w-full md:h-screen ">
      <video
        muted
        autoPlay
        playsInline
        ref={videoRef}
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
      >
        <source src="video.webm" type="video/webm" />
       <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex flex-col bottom-20 gap-5 justify-end items-center">
        {/* The new header and button */}
        <h2 className="text-xl font-semibold mb-2 text-white">Mercerize Tee</h2>
        <p className="text-l font-normal">
          LA BELLE ET LE MOCHE
        </p>
        <span className=" text-center text-xs w-60 font-extralight"> 100% cotton mercerised Fabric with Print all over,280 gsm for a comfortable wear made to last long</span>
        <button className="text-white text-sm border-2 border-white px-4 py-3 bg-transparent focus:outline-none mb-2 w-36 md:w-48">
            DISCOVER
        </button>
    </div>
      <div className="absolute bottom-10 left-2 md:bottom-10 md:left-10 lg:bottom-10 lg:left-20 w-20 flex space-x-2 items-center gap-6  bg-opacity-60 p-2">
        <button onClick={toggleMute} className="text-white focus:outline-none">
          {isMuted ? (
           <SpeakerXMarkIcon className="h-5 w-5" />
          ) : (
            <SpeakerWaveIcon className="h-5 w-5" />
          )}
        </button>
       
        <button
          onClick={togglePlayPause}
          className="text-white focus:outline-none"
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
