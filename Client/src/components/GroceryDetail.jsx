// src/components/GroceryDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

// Mock Data for Groceries
const products = [
    {
        id: 1,
        name: "Rice",
        price: "₹1,299",
        fakePrice: "₹1,799", // Fake price for discount
        description: "High-quality rice, perfect for your meals.",
        images: [
            "https://mlnf6rdzbkm2.i.optimole.com/w:1619/h:1080/q:mauto/f:best/https://www.formhealth.co/blog/wp-content/uploads/2023/04/iStock-153737841-scaled.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxH2cDL3SYQj60zDg65NKgtbm3xOH1T3fvag&s",
            "https://assets.epicurious.com/photos/568eb0bf7dc604b44b5355ee/16:9/w_2560%2Cc_limit/rice.jpg",
        ],
    },
    {
        id: 2,
        name: "Pulses",
        price: "₹2,999",
        fakePrice: "₹3,499", // Fake price for discount
        description: "Nutritious pulses rich in protein.",
        images: [
            "https://organicboosting.bio/wp-content/uploads/2024/04/organic-rice.jpg",
            "https://cdn.shopaccino.com/refresh/articles/dal-pulse-745535_l.jpg?v=426",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4isrC-EtelA5QDrtGiKj1l4331l0ck7h7Ig&s",
        ],
    },
    {
        id: 3,
        name: "Wheat",
        price: "₹3,999",
        fakePrice: "₹4,999", // Fake price for discount
        description: "Finest quality wheat for baking and cooking.",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_38OB-O3ct4_WTA4CLOW7rpDmuU8RkDVsQ&s",
            "https://www.kayawell.com/Data/UserContentImg/2018/3/183ac9a5-fa43-4ac1-90b2-f8b54c7b82b0.jpg",
            "https://standishmilling.com/cdn/shop/files/l-intro-1664307140_1024x1024.jpg?v=1722858758",
        ],
    },
];

const GroceryDetail = () => {
    const { id } = useParams();
    const product = products.find((item) => item.id === parseInt(id));

    // State to manage cart
    const [cart, setCart] = useState([]);
    const [selectedSize, setSelectedSize] = useState(''); // State for size selection
    const [quantity, setQuantity] = useState(1); // Default quantity
    const [currentImage, setCurrentImage] = useState(product.images[0]); // State for current image

    const addToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        setCart((prevCart) => [...prevCart, { ...product, size: selectedSize, quantity }]);
        alert(`${product.name} (${selectedSize}) has been added to your cart!`);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleQuantityChange = (event) => {
        const value = Math.max(1, event.target.value); // Ensure quantity is at least 1
        setQuantity(value);
    };

    const handleImageChange = (image) => {
        setCurrentImage(image);
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
                        <div className="flex flex-col items-center">
                            <img src={currentImage} alt={product.name} className="w-full h-80 object-cover rounded-md mb-4" />
                            <div className="flex space-x-2">
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-16 h-16 object-cover cursor-pointer rounded-md border hover:border-blue-500"
                                        onClick={() => handleImageChange(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                                <p className="text-gray-600 text-xl mb-4">
                                    <span className="line-through text-red-500">{product.fakePrice}</span> 
                                    <span className="ml-2">{product.price}</span>
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
                                        <option value="500g">500g</option>
                                        <option value="1kg">1kg</option>
                                        <option value="5kg">5kg</option>
                                        <option value="10kg">10kg</option>
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
                            <div className="mt-6">
                                <button onClick={addToCart} className="bg-blue-600 text-white py-2 px-4 rounded-lg mr-4">Add to Cart</button>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-lg">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Main Description */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Product Description</h2>
                        <p className="text-gray-700">
                            This is where the detailed description of the grocery item will go. It can include specifications, features, and additional details to help the customer make an informed decision.
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
                                "Absolutely love this rice! It's always perfectly fluffy and tastes great."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(4.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "Good quality pulses, but a bit pricier than some other brands."
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
                                <span className="text-gray-700">(5.0)</span>
                            </div>
                            <p className="text-gray-700">
                                "The wheat is perfect for baking! My bread turns out amazing every time."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroceryDetail;
