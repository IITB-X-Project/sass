import React from 'react';
import { FaStar } from 'react-icons/fa';

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <div className="flex justify-between items-end mt-auto">
        <div className="text-xl font-bold text-gray-800">${product.price}</div>
        <div className="flex items-center space-x-1">
          <FaStar className="text-yellow-500" />
          <span>{product.rating}</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Add to Cart
      </button>
    </div>
  );
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-blue-500'
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`h-8 flex items-center justify-center border border-gray-300 bg-blue-500 text-white rounded-lg px-4 transition duration-300 ${
            currentPage < totalPages ? '' : 'cursor-not-allowed'
          }`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
