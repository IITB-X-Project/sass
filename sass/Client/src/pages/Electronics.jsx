 // src/pages/Electronics.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import FilterSidebar from '../components/FilterSidebar';

// const Electronics = () => {
//     const products = [
//         { id: 1, name: "Smartphone", price: "₹54,999", image: "https://www.communicationstoday.co.in/wp-content/uploads/2024/06/Omdia-reports-booming-demand-for-low-end-smartphones-priced-under-150.jpg" },
//         { id: 2, name: "Laptop", price: "₹75,999", image: "https://content.jdmagicbox.com/comp/def_content/laptop_dealers-dell/default-laptop-dealers-dell-3-250.jpg" },
//         { id: 3, name: "Smartwatch", price: "₹19,999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWmFC_Za8W8l4FWPJV1t4m5eFBCBs5a3k9Q&s" },
//         { id: 4, name: "Headphones", price: "₹4,999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsrsguKy4dIA7XwB30EFGeVJ_ZV1Gn4wxctA&shttps://cdn.mos.cms.futurecdn.net/6973xUBZFtvYeDmTUtuviF.jpg" },
//         { id: 5, name: "Bluetooth Speaker", price: "₹7,999", image: "https://cdn.mos.cms.futurecdn.net/6973xUBZFtvYeDmTUtuviF.jpg" },
//     ];

//     return (
//         <div>
//             {/* Header Component */}
//             <Header />

//             {/* Electronics Heading */}
//             <h1 className="text-4xl font-bold text-center text-white bg-black bg-opacity-50 py-4 mb-8">Electronics</h1>
            
//             {/* Main Container with Background Image */}
//             <div
//                 className="min-h-screen flex"
//                 style={{
//                     backgroundImage: `url('https://www.ecommerce-nation.com/wp-content/uploads/2022/04/physical-electronic-store-digitalization-1100x640.jpg')`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}
//             >
//                 {/* Filter Sidebar */}
//                 <FilterSidebar />

//                 {/* Products Grid */}
//                 <div className="flex-1 p-4 sm:p-8 lg:p-16">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                         {products.map(product => (
//                             <div
//                                 key={product.id}
//                                 className="bg-white bg-opacity-90 shadow-md rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
//                             >
//                                 <Link to={`/products/${product.id}`}>
//                                     {/* Reduced Image Height */}
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         className="w-full h-32 sm:h-36 object-cover rounded-md mb-3 sm:mb-4"
//                                     />
//                                     {/* Optimized Font Sizes */}
//                                     <h2 className="font-semibold text-md sm:text-lg text-gray-800 mb-1">
//                                         {product.name}
//                                     </h2>
//                                     <p className="text-gray-600 text-sm sm:text-md">
//                                         {product.price}
//                                     </p>
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Electronics;
// src/pages/Electronics.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';

const Electronics = () => {
    // State to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch products filtered by Electronics category
    const fetchFilteredProducts = async () => {
        try {
            console.log('Fetching products...');
            const response = await axios.get('http://localhost:3000/api/products/filter-product', {
                params: {
                    category: 'electronics', // Filter by electronics category
                },
            });
            console.log('API Response:', response.data);
            if (response.data && response.data.products) {
                setProducts(response.data.products);
            } else {
                console.warn('No products found in the response.');
            }
        } catch (error) {
            console.error('Error fetching filtered products:', error);
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
        console.log('Products State:', products);
    }, [products]);

    return (
        <div>
            {/* Header Component */}
            <Header />

            {/* Electronics Heading */}
            <h1 className="text-4xl font-bold text-center text-white bg-black bg-opacity-50 py-4 mb-8">
                Electronics
            </h1>
            
            {/* Main Container with Background Image */}
            <div
                className="min-h-screen flex"
                style={{
                    backgroundImage: `url('https://www.ecommerce-nation.com/wp-content/uploads/2022/04/physical-electronic-store-digitalization-1100x640.jpg')`,
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
                        <p>No products found in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Electronics;
