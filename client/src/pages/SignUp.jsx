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
      <h2>Sign Up</h2>
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
  );
}
