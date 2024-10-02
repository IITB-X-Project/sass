// FilterSidebar.js
import React, { useState } from 'react';

const FilterSidebar = ({ products, setFilteredProducts }) => {
    // State to track selected filter options
    const [sort, setSort] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [priceRange, setPriceRange] = useState('');

    // Function to apply filters based on selected options
    const applyFilters = () => {
        let filteredProducts = [...products];

        // Sort by price
        if (sort) {
            filteredProducts = filteredProducts.sort((a, b) =>
                sort === 'low-to-high' ? a.salePrice - b.salePrice : b.salePrice - a.salePrice
            );
        }

        // Filter by rating
        if (selectedRating) {
            const rating = parseInt(selectedRating);
            filteredProducts = filteredProducts.filter(product => product.averageReview >= rating);
        }

        // Filter by price range
        if (priceRange) {
            if (priceRange === '0-1000') {
                filteredProducts = filteredProducts.filter(product => product.salePrice <= 1000);
            } else if (priceRange === '1000-5000') {
                filteredProducts = filteredProducts.filter(product => product.salePrice > 1000 && product.salePrice <= 5000);
            } else if (priceRange === '5000-10000') {
                filteredProducts = filteredProducts.filter(product => product.salePrice > 5000 && product.salePrice <= 10000);
            } else if (priceRange === '10000-above') {
                filteredProducts = filteredProducts.filter(product => product.salePrice > 10000);
            }
        }

        // Update the filtered products in the parent component
        setFilteredProducts(filteredProducts);
    };

    return (
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-4 w-64">
            <h2 className="text-lg font-bold mb-4">Filters</h2>

            {/* Sort by Price */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Sort by Price</h3>
                <div>
                    <input
                        type="radio"
                        id="low-to-high"
                        name="sort"
                        value="low-to-high"
                        checked={sort === 'low-to-high'}
                        onChange={() => setSort('low-to-high')}
                    />
                    <label htmlFor="low-to-high" className="ml-2">Low to High</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="high-to-low"
                        name="sort"
                        value="high-to-low"
                        checked={sort === 'high-to-low'}
                        onChange={() => setSort('high-to-low')}
                    />
                    <label htmlFor="high-to-low" className="ml-2">High to Low</label>
                </div>
            </div>

            {/* Filter by Rating */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Rating</h3>
                {[5, 4, 3, 2].map(rating => (
                    <div key={rating}>
                        <input
                            type="radio"
                            id={`${rating}-star`}
                            name="rating"
                            value={rating}
                            checked={selectedRating === `${rating}`}
                            onChange={() => setSelectedRating(`${rating}`)}
                        />
                        <label htmlFor={`${rating}-star`} className="ml-2">{rating} stars & above</label>
                    </div>
                ))}
            </div>

            {/* Filter by Price Range */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Price Range</h3>
                {['0-1000', '1000-5000', '5000-10000', '10000-above'].map(range => (
                    <div key={range}>
                        <input
                            type="radio"
                            id={range}
                            name="priceRange"
                            value={range}
                            checked={priceRange === range}
                            onChange={() => setPriceRange(range)}
                        />
                        <label htmlFor={range} className="ml-2">{range.replace('-', ' to ')}</label>
                    </div>
                ))}
            </div>

            {/* Apply Filters Button */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={applyFilters}
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterSidebar;
