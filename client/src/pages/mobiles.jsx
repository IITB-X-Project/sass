import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import Header from '../components/Header';

const Mobiles = () => {
    // State to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch products filtered by Mobiles category
    const fetchFilteredProducts = async () => {
        try {
            console.log('Fetching products...');
            const response = await axios.get('http://localhost:3000/api/products/filter-product', {
                params: {
                    category: 'mobiles', // Filter by mobiles category
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

            {/* Mobiles Heading */}
            <h1 className="text-4xl font-bold text-center text-white bg-black bg-opacity-50 py-4 mb-8">Mobiles</h1>

            {/* Main Container with Sidebar and Products */}
            <div className="min-h-screen flex" style={{
                backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrJr2RAJENb3fJ53tYYRRkeV1GNhafnKpEg&s')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
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
                                <div key={product._id} className="bg-white bg-opacity-90 shadow-xl rounded-xl border-2 border-gray-200 p-4 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                    <Link to={`/products/${product._id}`}>
                                        <img src={product.image[0]} alt={product.title} className="w-full h-40 object-cover rounded-md mb-4" />
                                        <h2 className="font-semibold text-lg text-gray-800">{product.title}</h2>
                                        <p className="text-gray-500 mb-2">₹{product.salePrice}</p>
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

export default Mobiles;