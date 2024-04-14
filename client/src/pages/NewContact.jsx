/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import back from '/back.jpg';
import LogoComponent from '../components/LogoComponent';
import SignOut from '../components/SignOut';
import { useSelector } from 'react-redux';

export default function NewContact() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: 'male', // Default gender
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contacts/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Reset form after successful submission
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          gender: 'male',
        });
        alert('Contact added successfully!');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add contact.');
      }
    } catch (error) {
      alert('An error occurred.');
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#083F46] overflow-hidden">
      {/* Top right triangle */}
      <div
        className="absolute -top-20 -mt-2 -right-60 h-64 w-96 bg-white rotate-45"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back}) `,
          backgroundSize: '100%',
        }}
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-20 ml-40 z-50 pr-20">
            <h1 className="text-5xl text-[#ffffff] font-bold mb-3 ">New Contact</h1>
            <div className="flex flex-col mt-10">
              <div className="flex flex-row gap-10">
                {/* full Name */}
                <div className="mb-4 ">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                {/* email */}
                <div className="mb-4 ">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-10">
                {/* phone number */}
                <div className="mb-4 ">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                {/* radio button for gender */}
                <div className="flex flex-row gap-14 items-center">
                  <span className="text-lg text-[#ffffff]">Gender </span>
                  <label htmlFor="male" className="inline-flex items-center bg-[#083F46] text-white rounded-lg px-2 py-1 cursor-pointer">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 mr-2 bg-[#083F46]"
                    />
                    Male
                  </label>
                  <label htmlFor="female" className="inline-flex items-center bg-[#083F46] text-white rounded-lg px-2 py-1 cursor-pointer">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 mr-2 bg-[#083F46]"
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-12 border w-64 border-gray-100 text-white font-bold py-1.5 px-8 rounded-3xl"
            >
              Add Your First Contact
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
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back})`,
          backgroundSize: '100%',
        }}
      ></div>
    </div>
  );
}
