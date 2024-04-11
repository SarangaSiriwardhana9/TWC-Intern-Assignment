/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  console.log(loading, error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
      
      }
      dispatch(signInSuccess(data));
        console.log(data);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));

      if (error.message.includes("duplicate key error collection")) {
      console.error("User already exists !");
      } else {
        console.error(error);
      }
    }
  };


    return (
      <div>
        <div className="flex h-screen  overflow-hidden">
          <div className="flex-1 bg-[#083F46] rounded-r-[50%] pr-10 -my-20 overflow-hidden">
            {/* Left side - Sign In component */}
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md">
                <div className="">
                  <h2 className="text-4xl text-white font-semibold">Sign In</h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label htmlFor='email' className="text-white">Email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email || ""}
                      onChange={handleChange}
                      placeholder='Enter your email'
                      required
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor='password' className="text-white">Password</label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      value={formData.password || ""}
                      onChange={handleChange}
                      placeholder='Enter your password'
                      required
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={loading}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
                <p className="text-white mt-4">
                  Dont have an account?{" "}
                  <Link to='/signup' className="text-blue-500">Sign Up</Link>
                </p>
                <p className="text-red-500">{error ? error.message || "Something went wrong." : ""}</p>
              </div>
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
