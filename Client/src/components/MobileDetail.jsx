import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

// Mock Data for Mobile Products
const products = [
    {
        id: 1,
        name: "Samsung",
        price: 29999,
        description: "A smartphone with a stunning display and powerful battery.",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWeLVWOzWla8Zy87cK4a2GlNrHkJ3S6s2w4w&s",
            "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s24-ultra/buy/S24Ultra-Color-Titanium_Grey_PC_0527_final.jpg",
            "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a156elbpins/gallery/in-galaxy-a15-5g-sm-a156-490596-sm-a156elbpins-539413345?$650_519_PNG$",
        ]
    },
    {
        id: 2,
        name: "Oppo",
        price: 39999,
        description: "A high-performance smartphone for gaming and multitasking.",
        images: [
            "https://5.imimg.com/data5/SELLER/Default/2023/7/322696971/RT/QW/IX/188924882/vivo-mobile-phone-500x500.jpg",
            "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/reno12-f-4g-en/listpage/427-600-grey.png.thumb.webp",
            "https://www.oppostore.com.au/cdn/shop/files/11OPPOReno11FBlue-Front_BackOverlappedCombination.png?v=1716347878&width=1000",
        ]
    },
    {
        id: 3,
        name: "Nokia",
        price: 19999,
        description: "An affordable smartphone with great features.",
        images: [
            "https://5.imimg.com/data5/SELLER/Default/2023/3/296178269/PQ/YW/MM/186724856/vivo-mobile-phone-500x500.jpg",
            "https://cdn.pixabay.com/photo/2013/07/13/10/29/nokia-157336_640.png",
            "https://i.ytimg.com/vi/Yq6CX-FKIbE/sddefault.jpg",
        ]
    },
];

const MobileDetail = () => {
    const { id } = useParams();
    const product = products.find((item) => item.id === parseInt(id));

    // Fake price artificially inflated by 10%
    const fakePrice = (product.price * 1.1).toFixed(2);

    // State to manage cart and other functionalities
    const [cart, setCart] = useState([]);
    const [currentImage, setCurrentImage] = useState(product?.images[0] || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        const productWithDetails = { ...product, size: selectedSize, quantity };
        setCart((prevCart) => [...prevCart, productWithDetails]);
        alert(`${product.name} (${selectedSize}) has been added to your cart!`);
    };

    const handleImageChange = (image) => {
        setCurrentImage(image);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(Math.max(1, Number(event.target.value)));
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
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80"
                                        onClick={() => handleImageChange(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                                <p className="text-gray-600 text-xl mb-2">
                                    <span className="line-through text-red-600 mr-2">₹{fakePrice}</span>
                                    <span className="font-semibold">₹{product.price}</span>
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
                                        <option value="Extra Large">Extra Large</option>
                                    </select>
                                </div>

                                {/* Quantity Input */}
                                <div className="mt-4">
                                    <label htmlFor="quantity" className="text-gray-700 font-medium">Quantity:</label>
                                    <input 
                                        type="number" 
                                        id="quantity" 
                                        value={quantity} 
                                        onChange={handleQuantityChange} 
                                        min="1" 
                                        className="ml-2 border rounded-lg py-2 px-3 w-16"
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
                            This is where you can include detailed information about the product, including specifications, features, and additional details.
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
                                "Excellent phone! The battery life is outstanding, and the camera quality is superb."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(4.5)</span>
                            </div>
                            <p className="text-gray-700">
                                "Great value for the price, but I wish it had more storage options."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(5.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "Best smartphone I've ever owned! Highly recommend."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDetail;
