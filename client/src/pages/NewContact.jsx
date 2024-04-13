/* eslint-disable no-unused-vars */
import back from '/back.jpg';
import LogoComponent from "../components/LogoComponent";
import { Link } from "react-router-dom";
import SignOut from '../components/SignOut';

export default function NewContact() {
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

        {/* Form area */}
        <form>
          <div className="flex flex-col mt-20 ml-40 z-50 pr-20">
            <h1 className="text-5xl text-[#ffffff] font-bold mb-3 ">New Contact</h1>

            <div className="flex flex-col mt-10">
              <div className='flex flex-row gap-10'>
                {/* full Name */}
                <div className="mb-4 ">
                  <input
                    type='fullName'
                    id='fullName'
                    name='fullName'
                    placeholder='full name'
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                {/* email */}
                <div className="mb-4 ">
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='e-mail'
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
              </div>

              <div className='flex flex-row gap-10'>
                {/* phone number */}
                <div className="mb-4 ">
                  <input
                    type='phoneNumber'
                    id='phoneNumber'
                    name='phoneNumber'
                    placeholder='phone number'
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                {/* radio button for gender */}

                <div className='flex flex-row gap-14 items-center'>
  <span className="text-lg text-[#ffffff]">gender </span>
  <label htmlFor="male" className="inline-flex bg-[#083F46] items-center">
    <input
      type="radio"
      id="male"
      name="gender"
      value="male"
      className="form-radio h-5 w-5 bg-[#083F46] !important"
    />
    <span className="ml-2 text-white">male</span>
  </label>
  <label htmlFor="female" className="inline-flex items-center">
    <input
      type="radio"
      id="female"
      name="gender"
      value="female"
      className="form-radio h-5 w-5"
    />
    <span className="ml-2 text-white">female</span>
  </label>
</div>





              </div>
            </div>


            <button
              type='submit'
              className=" mt-12 border w-64  border-gray-100 text-white font-bold py-1.5 px-8 rounded-3xl"
            >
              add your first contact
            </button>
          </div>
        </form>
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
