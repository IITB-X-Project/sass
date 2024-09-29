import React from 'react';
import {  FaClipboardList } from 'react-icons/fa';

const OrdersSumm = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          <button className="w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out shadow-md">
            <FaClipboardList className="mr-2" /> ORDERS SUMMARY
          </button>
        </div>
      </div>
  );
};

export default OrdersSumm;
