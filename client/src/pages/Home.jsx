import React from "react";
import SignOut from "../components/SignOut";

export default function Home() {
  return (
    <div>
      <div className="flex h-screen  overflow-hidden">
        <div className="flex-1 bg-[#083F46] rounded-r-[50%]   pr-10 -my-20  overflow-hidden">
          {/* Left side - Sign Up component */}
          <div className="flex items-center justify-center h-full">
            {/* Your SignUp component goes here */}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-l-[10%]">
          {/* Right side - Simple text */}
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl">Your simple text here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
