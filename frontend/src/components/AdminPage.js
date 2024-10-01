import React, { useState } from 'react';
import { FaInbox, FaClipboardList, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    { id: 1, product: 'Product 1', customer: 'Customer A', status: 'Pending' },
    { id: 2, product: 'Product 2', customer: 'Customer B', status: 'Pending' },
    { id: 3, product: 'Product 3', customer: 'Customer C', status: 'Pending' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleAccept = (id) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: 'Accepted' } : order
    ));
  };

  const handleReject = (id) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: 'Rejected' } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="flex justify-between mb-8">
          <button
            className="w-1/3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out shadow-md mr-4"
            onClick={() => navigate('/adminpage')}
          >
            <FaInbox className="mr-2" /> INCOMING ORDERS
          </button>

          <button
            className="w-1/3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out shadow-md mr-4"
            onClick={() => navigate('/OrdersSumm')}
          >
            <FaClipboardList className="mr-2" /> ORDERS SUMMARY
          </button>

          <button
            className="w-1/3 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-teal-700 transition duration-300 ease-in-out shadow-md"
            onClick={() => navigate('/AddProduct')}
          >
            <FaPlus className="mr-2" /> ADD NEW PRODUCT
          </button>
        </div>

        <div className="bg-gray-50 shadow-inner p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Incoming Orders</h2>

          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 shadow-sm rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div className="text-gray-800">
                  <p className="text-lg font-semibold">Product: {order.product}</p>
                  <p className="text-md">Customer: {order.customer}</p>
                  <div className="mt-2">
                    <label className="text-md font-bold mr-2">Status:</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="On Way">On Way</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition ease-in-out duration-300 shadow-md"
                    onClick={() => handleAccept(order.id)}
                    disabled={order.status !== 'Pending'}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition ease-in-out duration-300 shadow-md"
                    onClick={() => handleReject(order.id)}
                    disabled={order.status !== 'Pending'}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
