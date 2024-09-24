import React from 'react';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import logo from './assets/logo.png'; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="#">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover" 
            />
          </a>
        </div>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 rounded-md text-gray-700"
          />
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-white flex items-center cursor-pointer">
            <FaUserCircle size={24} />
            <span className="ml-2">My Account</span>
          </div>
          <div className="text-white flex items-center cursor-pointer">
            <FaShoppingCart size={24} />
            <span className="ml-2">Cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
