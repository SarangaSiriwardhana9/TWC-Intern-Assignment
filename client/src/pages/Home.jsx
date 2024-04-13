import React from "react";

export default function Home() {
  return (
    <div className="bg-green-500 h-screen overflow-hidden relative">
      <div className="absolute top-0 right-0 w-60 bg-white overflow-hidden">
        <div className="h-60 bg-green-500" style={{ borderTopLeftRadius: '200px', transform: 'rotate(90deg)' }}></div>
      </div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-white overflow-hidden">
        <div className="h-60 bg-green-500" style={{ borderBottomRightRadius: '200px', transform: 'rotate(90deg)' }}></div>
      </div>
    </div>
  );
}
