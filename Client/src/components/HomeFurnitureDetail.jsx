import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

// Mock Data for Home Furniture
const homeFurnitureProducts = [
    { id: 1, name: "Sofa", price: 25999, originalPrice: 29999, description: "A comfortable sofa perfect for living rooms.", image: "https://dukaan.b-cdn.net/700x700/webp/upload_file_service/5f925e59-ca74-423b-9acf-7e421ae0131c/46908f224f0880b5838f50b2b4cew-jpg-960x960-1.webp", thumbnails: [
        "https://dukaan.b-cdn.net/700x700/webp/upload_file_service/5f925e59-ca74-423b-9acf-7e421ae0131c/46908f224f0880b5838f50b2b4cew-jpg-960x960-1.webp",
        "https://m.media-amazon.com/images/I/71u3F2NZ9gL.jpg",
        "https://m.media-amazon.com/images/I/51jov6ONQJL.jpg",
    ]},
    { id: 2, name: "Dining Table", price: 15999, originalPrice: 19999, description: "A spacious dining table for family meals.", image: "https://rukminim2.flixcart.com/image/850/1000/k47cgi80/dining-set/f/g/k/8-seater-brown-rosewood-sheesham-hhfk-17-hariom-handicraft-original-imafn66rskcnv96g.jpeg?q=20&crop=false", thumbnails: [
        "https://rukminim2.flixcart.com/image/850/1000/k47cgi80/dining-set/f/g/k/8-seater-brown-rosewood-sheesham-hhfk-17-hariom-handicraft-original-imafn66rskcnv96g.jpeg?q=20&crop=false",
        "https://dusk.com/cdn/shop/products/heidi-solid-oak-4-6-seater-round-dining-table-natural-859126.jpg?v=1705427279",
        "https://www.casafurnishing.in/wp-content/uploads/2022/11/round-dining-table-6-seater-1-1-1.jpg",
    ]},
    { id: 3, name: "Coffee Table", price: 8999, originalPrice: 10999, description: "Stylish coffee table for your living space.", image: "https://mysleepyhead.com/media/catalog/product/m/e/menu_coffee_table.jpg", thumbnails: [
        "https://mysleepyhead.com/media/catalog/product/m/e/menu_coffee_table.jpg",
        "https://shagunarts.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/1/41ld2zo6cul.jpg",
        "https://cdn.decornation.in/wp-content/uploads/2020/02/wooden-coffee-table-4-stool.png",
    ]},
];

const HomeFurnitureDetail = () => {
    const { id } = useParams();
    const product = homeFurnitureProducts.find((item) => item.id === parseInt(id));

    const [cart, setCart] = useState([]);
    const [currentImage, setCurrentImage] = useState(product?.image || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        setCart((prevCart) => [...prevCart, { ...product, size: selectedSize, quantity }]);
        alert(`${product.name} (${selectedSize}) has been added to your cart!`);
    };

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if (value > 0) {
            setQuantity(value);
        }
    };

    if (!product) {
        return <h2>Product not found!</h2>;
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                    {/* Product Image and Thumbnails */}
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
                                <p className="text-gray-600 text-xl mb-2">
                                    <span className="line-through text-red-500">₹{product.originalPrice}</span> 
                                    <span className="text-xl font-bold ml-2">₹{product.price}</span>
                                </p>
                                <p className="text-gray-700">{product.description}</p>

                                {/* Size Selector */}
                                <div className="mt-4">
                                    <label htmlFor="size" className="text-gray-700 font-medium">Select Size:</label>
                                    <select 
                                        id="size" 
                                        value={selectedSize} 
                                        onChange={handleSizeChange} 
                                        className="ml-2 border rounded-lg py-2 px-3"
                                    >
                                        <option value="" disabled>Select a size</option>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        <option value="XL">XL</option>
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
                                        className="border rounded-lg p-2 w-20" 
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex space-x-2">
                                <button onClick={addToCart} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Add to Cart</button>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-lg">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Main Description */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold mb-1">Product Description</h2>
                        <p className="text-gray-700 mb-1">
                            This is where the detailed description of the home furniture item will go. It can include specifications, features, and additional details to help the customer make an informed decision.
                        </p>
                    </div>

                    {/* Reviews and Ratings */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Reviews and Ratings</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(5.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "Absolutely love this sofa! It's comfortable and stylish."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(4.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "Great dining table, but the assembly instructions could be clearer."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(4.5)</span>
                            </div>
                            <p className="text-gray-700">
                                "Perfect coffee table! Very sturdy and well-made."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeFurnitureDetail;
