// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '/logo.png'


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
  
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Sign up failed");
      }
  
      console.log(data);
      setFormData({});
      setLoading(false);
  
      // Show success alert
      alert("Sign up successful !");
  
      // Redirect to the signin page
      navigate("/signin");
    } catch (err) {
      setLoading(false);
  
      // Check if the error message contains the duplicate key error
      if (err.message.includes("duplicate key error collection")) {
        console.error("User already exists !");
      } else {
        console.error(err);
      }
  
      // Show alert for password mismatch
      if (err.message === "Passwords do not match") {
        alert("Passwords do not match");
      }
    }
  };
  
  return (
    <div>
      <div className="flex h-screen bg-cover bg-center overflow-hidden">
        {/* Background image with opacity */}
        <div
          className="absolute inset-0 "
          style={{
            backgroundImage: `url('/back.jpg')`,
            opacity: 0.15,
            zIndex: -1, // Ensure the background is behind other content
            backgroundSize: '50%',
          }}
        />
        
        <div className="flex-1 bg-[#083F46] rounded-r-[50%] pr-10 -my-20 overflow-hidden">
          {/* Left side - Sign Up component */}
          <div className="flex items-center justify-center h-full p-2 ">
            <div className="w-full max-w-md">
              <div className="">
                <h1 className="text-5xl text-white font-semibold">Register Now!</h1>
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-8 mt-12">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="e-mail"
                    required
                    className="w-full px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                <div className="mb-8 ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    placeholder="create password"
                    required
                    className="w-full px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                {/* confirm password */}
                <div className="mb-4">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword || ""}
                    onChange={handleChange}
                    placeholder="confirm password"
                    required
                    className="w-full px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 border border-gray-100 text-white font-bold py-1.5 px-6 rounded-3xl"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
              <p className="text-white mt-12 px-2">
                <Link to="/signin" className="text-slate-100 underline">
                  &lt; Back to login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1  rounded-l-[10%]">
          {/* Right side - Simple text */}
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col ">
              <img src={logo} alt="logo" className="h-12 w-36" />
              <h1 className="text-6xl text-[#083F46] font-bold mb-2">contacts </h1>
              <h1 className="text-5xl text-[#083F46] mb-3">Portal</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  

}
