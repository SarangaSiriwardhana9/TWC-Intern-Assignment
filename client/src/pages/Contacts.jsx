import React, { useState, useEffect } from 'react';
import back from '/back.jpg';
import LogoComponent from '../components/LogoComponent';
import SignOut from '../components/SignOut';
import { Link } from 'react-router-dom';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchContacts(); // Refresh contacts after deletion
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
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
        <h1 className="text-5xl text-[#ffffff] font-bold mb-3 ml-40 mt-10 "> Contacts</h1>
        {/* Table area */}
        <table className="ml-40 bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Full Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="py-3 px-6">{contact.fullName}</td>
                <td className="py-3 px-6">{contact.email}</td>
                <td className="py-3 px-6">{contact.phoneNumber}</td>
                <td className="py-3 px-6">{contact.gender}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1"
                  >
                    Delete
                  </button>
                  {/* Add edit button and functionality */}
                  {/* Add a link to edit contact */}
                  <Link to={`/edit/${contact._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
