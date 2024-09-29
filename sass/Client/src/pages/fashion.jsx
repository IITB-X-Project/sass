import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';

const Fashion = () => {
    // State to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch products filtered by Fashion category
    const fetchFilteredProducts = async () => {
        try {
            console.log('Fetching fashion products...');
            const response = await axios.get('http://localhost:3000/api/products/filter-product', {
                params: {
                    category: 'fashion', // Filter by fashion category
                },
            });
            console.log('API Response:', response.data);
            if (response.data && response.data.products) {
                setProducts(response.data.products);
            } else {
                console.warn('No products found in the response.');
            }
        } catch (error) {
            console.error('Error fetching filtered fashion products:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // UseEffect to fetch products on component mount
    useEffect(() => {
        fetchFilteredProducts();
    }, []);

    // Debugging: Log the products state
    useEffect(() => {
        console.log('Fashion Products State:', products);
    }, [products]);

    return (
        <div>
            {/* Header Component */}
            <Header />

            {/* Fashion Heading */}
            <h1 className="text-4xl font-bold text-center text-white bg-black bg-opacity-50 py-4 mb-8">
                Fashion
            </h1>
            
            {/* Main Container with Background Image */}
            <div
                className="min-h-screen flex"
                style={{
                    backgroundImage: `url('https://i.pinimg.com/originals/70/b7/5b/70b75b0cc5bafda8bc51f732a7b35c1e.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Filter Sidebar */}
                <FilterSidebar />

                {/* Products Grid */}
                <div className="flex-1 p-4 sm:p-8 lg:p-16">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p className="text-red-500">Error loading products.</p>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {products.map(product => (
                                <div
                                    key={product._id}
                                    className="bg-white bg-opacity-90 shadow-md rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                >
                                    <Link to={`/products/${product._id}`}>
                                        {/* Reduced Image Height */}
                                        <img
                                            src={product.image[0] }
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
                        <p>No fashion products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fashion;

