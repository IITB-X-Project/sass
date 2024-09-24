import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FilterSidebar = () => {
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200">
 
      <h2 className="text-2xl font-bold mb-6">Filters</h2>
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          Sort
          <FaChevronDown
            className={`transform transition-transform duration-300 ${
              isSortOpen ? 'rotate-180' : ''
            }`}
          />
        </h3>
        {isSortOpen && (
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Relevance</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Popularity</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Price - Low to High</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Price - High to Low</span>
            </label>
          </div>
        )}
      </div>
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          Brand
          <FaChevronDown
            className={`transform transition-transform duration-300 ${
              isBrandOpen ? 'rotate-180' : ''
            }`}
          />
        </h3>
        {isBrandOpen && (
          <div>
            {['Puma', 'Nike', 'Woodland', 'Reebok', 'Campus'].map((brand, index) => (
              <label key={index} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setIsSizeOpen(!isSizeOpen)}
        >
          Size
          <FaChevronDown
            className={`transform transition-transform duration-300 ${
              isSizeOpen ? 'rotate-180' : ''
            }`}
          />
        </h3>
        {isSizeOpen && (
          <div>
            {['UK11', 'UK10', 'UK9', 'UK8', 'UK7', 'UK6'].map((size, index) => (
              <label key={index} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span>{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setIsRatingOpen(!isRatingOpen)}
        >
          Rating
          <FaChevronDown
            className={`transform transition-transform duration-300 ${
              isRatingOpen ? 'rotate-180' : ''
            }`}
          />
        </h3>
        {isRatingOpen && (
          <div>
            {['4 Star & above', '3 Star & above', '2 Star & above'].map((rating, index) => (
              <label key={index} className="flex items-center space-x-2 mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span>{rating}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          Price
          <FaChevronDown
            className={`transform transition-transform duration-300 ${
              isPriceOpen ? 'rotate-180' : ''
            }`}
          />
        </h3>
        {isPriceOpen && (
          <div>
            {['299-499', '499-999', '999-1999', '1999-2999', '3999-4999', '4999-5999'].map(
              (priceRange, index) => (
                <label key={index} className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>{priceRange}</span>
                </label>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
