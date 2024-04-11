// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    }
  };

  return (
    <div>
      <div className="flex h-screen  overflow-hidden">
        <div className="flex-1 bg-[#083F46] rounded-r-[50%] pr-10 -my-20 overflow-hidden">
          {/* Left side - Sign Up component */}
          <div className="flex items-center justify-center h-full p-2">
            <div className="w-full max-w-md">
              <div className="">
                <h1 className="text-5xl text-white font-bold mb-2">Register Now!</h1>

              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-8 mt-12">

                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder='e-mail'
                    required
                    className="w-full px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                <div className="mb-8 ">

                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password || ""}
                    onChange={handleChange}
                    placeholder='password'
                    required
                    className="w-full px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>

                {/* confirm password */}
                <div className="mb-4">

                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formData.confirmPassword || ""}
                    onChange={handleChange}
                    placeholder='confirm password'
                    required
                    className="w-full px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                <button
                  type='submit'
                  disabled={loading}
                  className=" mt-6 border border-gray-100 text-white font-bold py-2 px-6 rounded-3xl"
                >
                  {loading ? "Regestering..." : "Register"}
                </button>
              </form>
              <p className="text-white mt-12 px-2">

                <Link to='/signin' className="text-slate-100 underline"> &lt; Back to login</Link>
              </p>
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
