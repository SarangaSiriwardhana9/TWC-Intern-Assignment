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
      <div>
        <h2>Sign In</h2>
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
          <button
            type='submit'
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
         
        </form>
        <p>
          Dont have an account?{" "}
          <Link to='/signup'>Sign Up</Link>
        </p>
        <p>{error ? error.message || "Something went wrong. ." : ""}</p>
      </div>
    </div>
  );
}
