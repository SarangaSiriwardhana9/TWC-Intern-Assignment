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
        <div className="flex-1 bg-[#083F46] rounded-r-[50%]   pr-10 -my-20  overflow-hidden">
          {/* Left side - Sign Up component */}
          <div className="flex items-center justify-center h-full">
            {/* Your SignUp component goes here */}

            <div >
              <div className="">
              <h1 className="text-4xl">Hi there,</h1>
              <h3 className='text-'>Welcome to our</h3>
              <h3>contacts portal </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder='Enter your email'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password || ""}
                    onChange={handleChange}
                    placeholder='Enter your password'
                    required
                  />
                </div>
                <button type='submit' disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
              <p>
                Already have an account?{" "}
                <Link to='/signin'>Sign In</Link>
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
