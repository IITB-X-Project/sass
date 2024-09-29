import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

// Mock Data for Fashion Products
const fashionProducts = [
    { id: 1, name: "T-Shirt", price: 1299, description: "A comfortable cotton t-shirt.", image: "https://img.damensch.com//damensch/cms-media/blog-images/Trending%20tshirt%20for%20men.jpg", thumbnails: [
        "https://img.damensch.com//damensch/cms-media/blog-images/Trending%20tshirt%20for%20men.jpg",
        "https://4.imimg.com/data4/JA/SO/MY-10764091/mens-round-neck-t-shirt-500x500.jpg",
        "https://rukminim2.flixcart.com/image/750/900/xif0q/t-shirt/a/i/0/m-tee-yellow-blue-world-sports-original-imags9vz267ug6ez.jpeg?q=20&crop=false",
        "https://5.imimg.com/data5/SELLER/Default/2024/5/419498274/LY/ET/MW/34655204/1e6ed4d1-dedb-4eaf-ac77-2b31071270ab-500x500.jpg",
    ]},
    { id: 2, name: "Jeans", price: 2999, description: "Stylish blue jeans with a modern fit.", image: "https://lscoecomm.scene7.com/is/image/lscoecomm/SEO_500_Series_Comparison_501_M_BLOG_Desktop?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1125", thumbnails: [
        "https://lscoecomm.scene7.com/is/image/lscoecomm/SEO_500_Series_Comparison_501_M_BLOG_Desktop?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1125",
        "https://www.jiomart.com/images/product/original/rv2yjiksxf/forgive-boot-cut-style-men-s-boys-denim-jeans-perfect-for-casual-wear-mid-blue-32-product-images-rv2yjiksxf-0-202212010812.jpg?im=Resize=(1000,1000)",
        "https://www.jiomart.com/images/product/original/rvdrp5v90n/forgive-boot-cut-style-men-s-boys-denim-jeans-perfect-for-casual-wear-blue-30-product-images-rvdrp5v90n-5-202212010811.jpg?im=Resize=(1000,1000)",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJODBU4LT3SeL_o-39qdGtnRV3R3RW1oIreaCho_CTB-EOFmil50jm-6Q7E08vDI6650w&usqp=CAU",
    ]},
    { id: 3, name: "Jacket", price: 3999, description: "A trendy jacket suitable for all seasons.", image: "https://m.media-amazon.com/images/I/71VFs2XrDVL._AC_UY350_.jpg", thumbnails: [
        "https://m.media-amazon.com/images/I/71VFs2XrDVL._AC_UY350_.jpg",
        "https://www.saintg.in/cdn/shop/files/Untitled-46.1.jpg?v=1703312096&width=1080",
        "https://www.thejacketmaker.com/assets/v2/5-column/biker_jackets-61bf6d4a509c604540ed4ad7e644692056a8f6848d29aca891fa456b93732807.webp",
        "https://hub.com.pk/cdn/shop/files/6_0fc0a51a-40a6-4ca8-abaa-31d415b5ec33_600x.jpg?v=1702030660",
    ]},
];

const sizes = ["Small", "Medium", "Large", "Extra Large"];

const FashionDetail = () => {
    const { id } = useParams();
    const product = fashionProducts.find((item) => item.id === parseInt(id));

    const fakePrice = (product.price * 1.1).toFixed(2); // Fake price artificially inflated by 10%
    
    const [cart, setCart] = useState([]);
    const [currentImage, setCurrentImage] = useState(product?.image || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        if (selectedSize === '') {
            alert('Please select a size before adding to cart.');
            return;
        }
        const productWithDetails = { ...product, selectedSize, quantity };
        setCart((prevCart) => [...prevCart, productWithDetails]);
        alert(`${product.name} (Size: ${selectedSize}, Quantity: ${quantity}) has been added to your cart!`);
    };

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    if (!product) {
        return <h2>Product not found!</h2>;
    }

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                    {/* Product Image and Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <img src={currentImage} alt={product.name} className="w-full h-80 object-cover rounded-md mb-4" />
                            <div className="flex justify-center space-x-2">
                                {product.thumbnails.map((thumbnail, index) => (
                                    <img 
                                        key={index} 
                                        src={thumbnail} 
                                        alt={`${product.name} thumbnail ${index + 1}`} 
                                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80"
                                        onClick={() => handleThumbnailClick(thumbnail)} 
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                                {/* Price and Discount */}
                                <div className="relative">
                                    <p className="text-lg mb-2">
                                        <span className="line-through text-red-600 mr-2">₹{fakePrice}</span>
                                        <span className="font-semibold text-2xl">₹{product.price}</span>
                                    </p>
                                    {/* Removed 10% OFF Tag */}
                                </div>

                                <p className="text-gray-700 mt-4">{product.description}</p>

                                {/* Size Selection */}
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
                                    <select 
                                        value={selectedSize} 
                                        onChange={handleSizeChange} 
                                        className="border py-2 px-4 rounded-lg bg-white"
                                    >
                                        <option value="">Select a size</option>
                                        {sizes.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quantity Input */}
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold mb-2">Quantity:</h2>
                                    <input 
                                        type="number" 
                                        value={quantity} 
                                        onChange={handleQuantityChange} 
                                        min="1" 
                                        className="border py-2 px-4 rounded-lg w-16"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button onClick={addToCart} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Add to Cart</button>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-lg">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Main Description */}
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold mb-1">Product Description</h2>
                        <p className="text-gray-700 mb-1">
                            This is where you can include detailed information about the fashion item, including features, material, care instructions, etc.
                        </p>
                    </div>

                    {/* Reviews and Ratings */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Reviews and Ratings</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(5.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "Absolutely love this product! The quality is top-notch and it exceeded my expectations."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(4.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "Great value for the price, but I wish it came in more color options."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(5.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "Amazing jacket! Perfect fit and very comfortable."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FashionDetail;
