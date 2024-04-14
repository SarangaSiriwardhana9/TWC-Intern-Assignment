import React, { useState, useEffect } from 'react';
import LogoComponent from '../components/LogoComponent';
import SignOut from '../components/SignOut';
import { Link } from 'react-router-dom';
import back from '/back.jpg';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedContact, setEditedContact] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });

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

  const handleEdit = (id, contact) => {
    setEditingContactId(id);
    setEditedContact(contact);
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedContact),
      });

      if (res.ok) {
        setEditingContactId(null);
        fetchContacts();
      } else {
        console.error('Failed to update contact');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchContacts();
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
      >

      </div>
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
        <div className="overflow-x-auto px-40">
          <div className="h-[300px] overflow-y-auto bg-slate-100 rounded-3xl">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} className="border-t border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">{editingContactId === contact._id ? <input type="text" name="fullName" value={editedContact.fullName} onChange={handleChange} className="border border-gray-300 rounded-md p-1" /> : contact.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{editingContactId === contact._id ? <input type="text" name="email" value={editedContact.email} onChange={handleChange} className="border border-gray-300 rounded-md p-1" /> : contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{editingContactId === contact._id ? <input type="text" name="phoneNumber" value={editedContact.phoneNumber} onChange={handleChange} className="border border-gray-300 rounded-md p-1" /> : contact.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{editingContactId === contact._id ? <input type="text" name="gender" value={editedContact.gender} onChange={handleChange} className="border border-gray-300 rounded-md p-1" /> : contact.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingContactId === contact._id ? (
                        <button onClick={() => handleSave(contact._id)} className="text-white bg-[#083F46] py-1.5 px-3 rounded-2xl hover:text-white-200">Save</button>
                      ) : (
                        <div>
                          <button onClick={() => handleEdit(contact._id, contact)} className="text-[#083F46] hover:text-indigo-900"><MdEdit/></button>
                          <button onClick={() => handleDelete(contact._id)} className="text-[#083F46] hover:text-red-900 ml-2"><RiDeleteBin6Line/></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back})`,
          backgroundSize: '100%',
        }}
      ></div>
    </div>

  );
}











/*  */