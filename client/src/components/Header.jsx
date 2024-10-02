// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext'; // Import the cart context

// function Header() {
//     const { cartCount } = useCart(); // Access cart count from context
// const [searchQuery, setSearchQuery] = useState('');
// const navigate = useNavigate();

// const handleSearch = async (e) => {
//     e.preventDefault();
//     console.log('Search Query:', searchQuery);
    
//     if (searchQuery.trim()) {
//         try {
//             const response = await axios.get(`http://localhost:3000/api/searches/product/${searchQuery}`);
//             console.log('Search API Response:', response.data); // Log the response

//             if (response.data && response.data.products) {
//                 // Redirect to the search results page with products
//                 navigate('/search', { state: { products: response.data.products } });
//             } else {
//                 alert('No products found');
//             }
//         } catch (error) {
//             console.error('Error during search:', error);
//         }
//     } else {
//         alert('Please enter a search query');
//     }
// };

//     return (
//         <header className="bg-gray-800 shadow-md p-4">
//             <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
//                 <div className="logo text-slate-200 font-bold text-xl">
//                     <img
//                         width="65"
//                         height="60"
//                         src="https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg"
//                         alt="eCommerce IIT Bombay"
//                     />
//                 </div>
//                <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
{/* <form onSubmit={handleSearch}>
<div className="flex border border-gray-300 rounded">
    <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 outline-none rounded-l"
    />
    <button
        type="submit"
        className="bg-gray-700 p-2 rounded-r hover:bg-gray-600 transition-colors duration-300"
    >
        <img
            width="20"
            height="20"
            src="https://img.icons8.com/pastel-glyph/128/FFFFFF/search--v1.png"
            alt="search"
        />
    </button>
</div>
</form>
</div> */}
//                 <div className="flex space-x-4 mt-2 sm:mt-0">
//                     <button className="text-slate-200 font-medium flex items-center hover:border-b-2 transition-colors duration-300">
//                         <img
//                             className="w-5 h-5 mr-1"
//                             src="https://img.icons8.com/material-outlined/24/FFFFFF/user.png"
//                             alt="my-account"
//                         />
//                         My Account
//                     </button>
//                     <Link to="/cart" className="text-slate-200 font-medium flex items-center hover:border-b-2 transition-colors duration-300">
//                         <img
//                             className="w-5 h-5 mr-1"
//                             src="https://img.icons8.com/material-outlined/24/FFFFFF/shopping-cart.png"
//                             alt="cart"
//                         />
//                         Cart ({cartCount}) {/* Show cart count */}
//                     </Link>
//                     <button className="text-slate-200 font-medium flex items-center hover:border-b-2 transition-colors duration-300">
//                         <img
//                             className="w-5 h-5 mr-1"
//                             src="https://img.icons8.com/material-outlined/24/FFFFFF/sell.png"
//                             alt="become-a-seller"
//                         />
//                         Become a Seller
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

function Header() {
    const { cartCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log('Search Query:', searchQuery);
        
        if (searchQuery.trim()) {
            try {
                const response = await axios.get(`http://localhost:3000/api/searches/product/${searchQuery}`);
                console.log('Search API Response:', response.data); // Log the response

                if (response.data && response.data.products) {
                    // Redirect to the search results page with products
                    navigate('/search', { state: { products: response.data.products } });
                } else {
                    alert('No products found');
                }
            } catch (error) {
                console.error('Error during search:', error);
            }
        } else {
            alert('Please enter a search query');
        }
    };

    return (
        <header className="bg-gray-800 shadow-md p-4">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div className="logo text-slate-200 font-bold text-xl">
                    <img
                        width="65"
                        height="60"
                        src="https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg"
                        alt="eCommerce IIT Bombay"
                    />
                </div>
                <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
                    <form onSubmit={handleSearch}>
                        <div className="flex border border-gray-300 rounded">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 outline-none rounded-l"
                            />
                            <button
                                type="submit"
                                className="bg-gray-700 p-2 rounded-r hover:bg-gray-600 transition-colors duration-300"
                            >
                                <img
                                    width="20"
                                    height="20"
                                    src="https://img.icons8.com/pastel-glyph/128/FFFFFF/search--v1.png"
                                    alt="search"
                                />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <button className="text-slate-200 font-medium flex items-center hover:border-b-2 transition-colors duration-300">
                       <img
                            className="w-5 h-5 mr-1"
                            src="https://img.icons8.com/material-outlined/24/FFFFFF/user.png"
                            alt="my-account" 
                        />
                        My Account
                    </button>
                    <Link to="/cart" className="text-slate-200 font-medium flex items-center hover:border-b-2 transition-colors duration-300">
                        <img
                            className="w-5 h-5 mr-1"
                            src="https://img.icons8.com/material-outlined/24/FFFFFF/shopping-cart.png"
                            alt="cart"
                        />
                        Cart ({cartCount}) {/* Show cart count */}
                    </Link>
                    <button className="text-slate-200 font-medium flex items-center hover:border-b-2 transition-colors duration-300">
                        <img
                            className="w-5 h-5 mr-1"
                            src="https://img.icons8.com/material-outlined/24/FFFFFF/sell.png"
                            alt="become-a-seller"
                        />
                        Become a Seller
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;