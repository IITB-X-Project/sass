// src/pages/CartPage.jsx
import React from 'react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
    const { cart, addedMessage } = useCart(); // Get cart items and message from context

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {addedMessage && <div className="mb-4 text-green-600">{addedMessage}</div>}
                {cart.length === 0 ? (
                    <p>Your cart is empty!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {cart.map((product, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                                <img src={product.image[0]} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
                                <h2 className="font-semibold text-lg">{product.name}</h2>
                                <p className="text-gray-500">{product.price}</p>
                                <p className="text-gray-500">Size: {product.size}</p> {/* Display the selected size */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
