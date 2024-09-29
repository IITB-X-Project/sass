import React from 'react';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
  
  

const ProductGrid = () => {
  const products = [
    {
      name: 'Product 1',
      price: 99.99,
      rating: 4.5,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 2',
      price: 79.99,
      rating: 4.2,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 3',
      price: 49.99,
      rating: 4.8,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 4',
      price: 89.99,
      rating: 4.1,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 5',
      price: 29.99,
      rating: 4.7,
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Product 6',
      price: 59.99,
      rating: 4.3,
      image: 'https://via.placeholder.com/150',
    },
  ];

  const totalPages = 20; 
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductGrid;
