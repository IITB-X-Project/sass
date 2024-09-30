import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const products = location.state?.products || []; // Safely access products
    console.log('Fetched Products:', products); // Log fetched products

    return (
        <div className="flex-1 p-4 sm:p-8 lg:p-16">
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {products.map(product => (
                        <div
                            key={product._id}
                            className="bg-white bg-opacity-90 shadow-md rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
                        >
                            <Link to={`/products/${product._id}`}>
                                {/* Check if image exists */}
                                <img
                                    src={product.image && product.image.length > 0 ? product.image[0] : 'fallback-image-url.jpg'} // Replace with your fallback image URL
                                    alt={product.title}
                                    className="w-full h-32 sm:h-36 object-cover rounded-md mb-3 sm:mb-4"
                                />
                                {/* Optimized Font Sizes */}
                                <h2 className="font-semibold text-md sm:text-lg text-gray-800 mb-1">
                                    {product.title}
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-md">
                                    ₹{product.salePrice}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found in this category.</p>
            )}
        </div>
    );
};

export default SearchResults;