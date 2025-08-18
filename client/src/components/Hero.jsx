import React from "react";
import { assets } from "../assets/assets";


import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative flex flex-col
      w-full items-center justify-center bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat
      min-h-screen text-center"
    >
      <div className="text-center mb-6">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
          font-semibold mx-auto leading-[1.2]"
        >
          Create amazing content with <br />
          <span className="text-indigo-600">AI tools</span>
        </h1>

        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto
        max-sm:text-xs text-gray-600">
          Transform your content with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          Start Creating Now
        </button>
        <button className="bg-white px-6 py-3 rounded-lg shadow hover:scale-105 active:scale-95 transition cursor-pointer">
          Watch Demo
        </button>
      </div>
      <div className='flex items-cecnter gap-4 mt-8 mx-auto text-gray-600'>
        <img src={assets.user_group} alt="" className="h-8"/>Trusted by 10k+people
      </div>
    </div>
  );
};

export default Hero;
