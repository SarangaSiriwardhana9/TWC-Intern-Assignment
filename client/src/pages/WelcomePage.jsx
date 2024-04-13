/* eslint-disable no-unused-vars */
import back from '/back.jpg';
import LogoComponent from "../components/LogoComponent";
import { Link } from "react-router-dom";
import SignOut from '../components/SignOut';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen bg-[#083F46] overflow-hidden">

      {/* Top right triangle */}
      <div
        className="absolute -top-20 -mt-2 -right-60 h-64 w-96 bg-white rotate-45"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back}) `, backgroundSize: '100%', }}
      ></div>
      <div className="absolute -right-6 -top-6">
        <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
      </div>

      {/* main area */}
      <div className="relative z-50 ml-5 mt-10 ">

        {/* Logo component */}
        <div className="flex flex-col mt-14 ml-40 z-50">
          <LogoComponent />
        </div>

        {/* Welcome area */}
        <div className="flex flex-col mt-20 ml-40 z-50 pr-20">
          <h1 className="text-5xl text-[#ffffff] font-bold mb-3 ">Welcome,</h1>
          <h1 className="text-2xl text-[#ffffff] mb-1 ">This is where your contacts will live. Click the button below to add a new contact.</h1>
          

          <button
            type='submit'
            className=" mt-12 border w-64  border-gray-100 text-white font-bold py-1.5 px-8 rounded-3xl"
          >
            add your first contact
          </button>
        </div>
      </div>

      {/* Logout Button in right site bottom */}
      <div className="fixed bottom-0 right-0 m-8">
        <SignOut />
      </div>

      {/* Left side */}
      <div className="absolute z-10 -left-6 -bottom-6">
        <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
      </div>

      {/* Left bottom (unchanged) */}
      <div
        className="absolute -bottom-40 -left-40 h-96 w-64 bg-white -rotate-45"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back})`, backgroundSize: '100%' }}
      ></div>
    </div>
  );
}