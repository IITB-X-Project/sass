// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from './Header'; 

// // Mock Data for Products
// const products = [
//     { id: 1, name: "Smartphone", price: "₹54,999", originalPrice: "₹59,999", description: "A high-end smartphone with the latest features and top performance.", image: "https://www.communicationstoday.co.in/wp-content/uploads/2024/06/Omdia-reports-booming-demand-for-low-end-smartphones-priced-under-150.jpg", thumbnails: [
//         "https://www.communicationstoday.co.in/wp-content/uploads/2024/06/Omdia-reports-booming-demand-for-low-end-smartphones-priced-under-150.jpg",
//         "https://cdn.mos.cms.futurecdn.net/ShSLCcK45aEQTj8sRbSebe-1200-80.jpg",
//         "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202004/Screenshot_2020-04-11_at_11.37_0.png?size=690:388",
//         "https://i.pcmag.com/imagery/roundups/07ml3nh3QrzTLZ9UycfQQB2-52..v1696534815.jpg",
//     ]},
//     { id: 2, name: "Laptop", price: "₹75,999", originalPrice: "₹80,999", description: "A powerful laptop suitable for gaming, coding, and media consumption.", image: "https://content.jdmagicbox.com/comp/def_content/laptop_dealers-dell/default-laptop-dealers-dell-3-250.jpg", thumbnails: [
//         "https://content.jdmagicbox.com/comp/def_content/laptop_dealers-dell/default-laptop-dealers-dell-3-250.jpg",
//         "https://p1-ofp.static.pub/medias/bWFzdGVyfGltYWdlc3wxOTk3Njl8aW1hZ2UvcG5nfGltYWdlcy9oYTEvaGFiLzE0NDQ3MTUxODQxMzEwLnBuZ3w5OWE2OTc4OTRiODU3MTRhNjViODZiY2QwODc2Mjc1N2MyNWM2MmQyMDEyYjgzODRlYTgzN2I2NjBmYzZiZGQw/lenovo-laptop-thinkpad-t470-hero.png",
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEAv4_3UQXtZU7Gkw2TLlPy0OSbCXg4OOxZ6Hx9CmzmypTkL64FtUr3CI21YWcNE1BBIk&usqp=CAU",
//         "https://i.ebayimg.com/images/g/sdAAAOSwuA5ioLTo/s-l1200.jpg",
//     ]},
//     { id: 3, name: "Smartwatch", price: "₹19,999", originalPrice: "₹22,999", description: "A smartwatch with fitness tracking and notification features.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWmFC_Za8W8l4FWPJV1t4m5eFBCBs5a3k9Q&s", thumbnails: [
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWmFC_Za8W8l4FWPJV1t4m5eFBCBs5a3k9Q&s",
//         "https://m.media-amazon.com/images/S/aplus-media-library-service-media/c3bd1d2c-4d1e-4cdd-abb7-99be1705415b.__CR0,0,300,300_PT0_SX300_V1___.jpg",
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSww8TaC42lra_M8ENxsWRHXCSDKNFXuzrOg7JvgbkW91f6l_MfDP5Sphm7Jv0gt7aeACI&usqp=CAU",
//         "https://m.media-amazon.com/images/I/41AESEW8L6L._CR3,0,1914,1080_SR684,386_.jpg",
//     ]},
//     { id: 4, name: "Headphones", price: "₹4,999", originalPrice: "₹5,999", description: "A headphone with noise cancellation and superior sound quality.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsrsguKy4dIA7XwB30EFGeVJ_ZV1Gn4wxctA&s", thumbnails: [
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsrsguKy4dIA7XwB30EFGeVJ_ZV1Gn4wxctA&s",
//         "https://5.imimg.com/data5/SELLER/Default/2023/2/DY/IT/RX/180574449/headphone.jpeg",
//         "https://d33p2k2w4zpozf.cloudfront.net/media/catalog/product/b/e/beyerdynamic-mmx-200-wireless-thumbnail-black-grey-perspective_transparent.png",
//     ]},
//     { id: 5, name: "Bluetooth Speaker", price: "₹7,999", originalPrice: "₹8,999", description: "A Bluetooth speaker with high-quality sound and deep bass.", image: "https://cdn.mos.cms.futurecdn.net/6973xUBZFtvYeDmTUtuviF.jpg", thumbnails: [
//         "https://cdn.mos.cms.futurecdn.net/6973xUBZFtvYeDmTUtuviF.jpg",
//         "https://m.media-amazon.com/images/I/41jVsyxAQCL._QL92_SH45_SS200_.jpg",
//         "https://p.globalsources.com/IMAGES/PDT/B1185341960/Bluetooth-Speaker-outdoor-Speaker-Bluetooth.jpg",
//         "https://m.media-amazon.com/images/I/81G7o-sXP+L._AC_UF1000,1000_QL80_.jpg",
//     ]},
// ];

// const sizes = ["Small", "Medium", "Large", "Extra Large"];

// const ProductDetail = () => {
//     const { id } = useParams();
//     const product = products.find((item) => item.id === parseInt(id));
    
//     // State to manage cart
//     const [cart, setCart] = useState([]);
    
//     // State for the current main image
//     const [currentImage, setCurrentImage] = useState(product.image);
    
//     // State for the selected size and quantity
//     const [selectedSize, setSelectedSize] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [message, setMessage] = useState(''); // State for add-to-cart message

//     const addToCart = () => {
//         if (selectedSize) {
//             const cartItem = { ...product, selectedSize, quantity };
//             setCart((prevCart) => [...prevCart, cartItem]);
//             setMessage(`${product.name} has been added to your cart!`); // Set success message

//             // Clear message after a few seconds
//             setTimeout(() => {
//                 setMessage('');
//             }, 2000);
//         } else {
//             alert("Please select a size before adding to cart.");
//         }
//     };

//     const handleThumbnailClick = (image) => {
//         setCurrentImage(image);
//     };

//     const handleSizeClick = (size) => {
//         setSelectedSize(size);
//     };

//     const handleQuantityChange = (event) => {
//         const value = event.target.value;
//         if (value > 0) {
//             setQuantity(value);
//         }
//     };

//     if (!product) {
//         return <h2>Product not found!</h2>;
//     }

//     return (
//         <div>
//             <Header /> 

//             <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//                 <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
//                     {/* Product Image and Details */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="flex flex-col">
//                             <img src={currentImage} alt={product.name} className="w-full h-80 object-cover rounded-md mb-4" />
//                             <div className="flex justify-center space-x-2">
//                                 {product.thumbnails.map((thumbnail, index) => (
//                                     <img 
//                                         key={index} 
//                                         src={thumbnail} 
//                                         alt={`${product.name} thumbnail ${index + 1}`} 
//                                         className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80"
//                                         onClick={() => handleThumbnailClick(thumbnail)} 
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="flex flex-col justify-between">
//                             <div>
//                                 <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//                                 <p className="text-gray-600 text-xl mb-2">
//                                     {product.price} <span className="line-through text-red-500">{product.originalPrice}</span>
//                                 </p>
//                                 <p className="text-gray-700 mb-4">{product.description}</p>
                                
//                                 {/* Size Selection */}
//                                 <div className="mt-4">
//                                     <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
//                                     <select 
//                                         value={selectedSize} 
//                                         onChange={(e) => handleSizeClick(e.target.value)} 
//                                         className="border rounded-lg p-2"
//                                     >
//                                         <option value="" disabled>Select a size</option>
//                                         {sizes.map((size) => (
//                                             <option key={size} value={size}>
//                                                 {size}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Quantity Input */}
//                                 <div className="mt-4">
//                                     <h2 className="text-lg font-semibold mb-2">Quantity:</h2>
//                                     <input 
//                                         type="number" 
//                                         value={quantity} 
//                                         onChange={handleQuantityChange} 
//                                         min="1" 
//                                         className="border rounded-lg p-2 w-20"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-6">
//                                 <button onClick={addToCart} className="bg-blue-600 text-white py-2 px-4 rounded-lg mr-4">Add to Cart</button>
//                                 <button className="bg-green-600 text-white py-2 px-4 rounded-lg">Buy Now</button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Success Message */}
//                     {message && <p className="text-green-600 text-lg mt-4">{message}</p>}

//                     {/* Main Description */}
//                     <div className="mt-6">
//                         <h2 className="text-xl font-semibold mb-2">Product Description</h2>
//                         <p className="text-gray-700">
//                             {product.description}
//                         </p>
//                     </div>

//                     {/* Review and Ratings */}
//                     <div className="mt-6">
//                         <h2 className="text-xl font-semibold mb-2">Review and Ratings</h2>
//                         <div className="bg-gray-100 p-4 rounded-lg">
//                             <div className="flex items-center mb-2">
//                                 <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
//                                 <span className="text-gray-700">(5.0)</span>
//                             </div>
//                             <p className="text-gray-700">
//                                 "Absolutely love this product! The quality is top-notch and it exceeded my expectations."
//                             </p>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-lg mt-4">
//                             <div className="flex items-center mb-2">
//                                 <span className="text-yellow-500 mr-2">⭐⭐⭐⭐</span>
//                                 <span className="text-gray-700">(4.0)</span>
//                             </div>
//                             <p className="text-gray-700">
//                                 "Great value for the price, but I wish it came in more color options."
//                             </p>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-lg mt-4">
//                             <div className="flex items-center mb-2">
//                                 <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
//                                 <span className="text-gray-700">(5.0)</span>
//                             </div>
//                             <p className="text-gray-700">
//                                 "The battery life is fantastic, and it connects seamlessly to all my devices."
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/product/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found!');
                }
                const data = await response.json();
                setProduct(data.product);
                if (data.product.image && data.product.image.length > 0) {
                    setCurrentImage(data.product.image[0]); // Set the default image to the first product image
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        if (selectedSize) {
            const cartItem = { ...product, selectedSize, quantity };
            // Assuming there's a setCart method passed as props or through context
            setMessage(`${product.title} has been added to your cart!`);

            setTimeout(() => {
                setMessage('');
            }, 2000);
        } else {
            alert('Please select a size before adding to cart.');
        }
    };

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if (value > 0) {
            setQuantity(value);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <h2>Product not found!</h2>;
    }

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            {currentImage && (
                                <img src={currentImage} alt={product.title} className="w-full h-80 object-cover rounded-md mb-4" />
                            )}
                            <div className="flex justify-center space-x-2">
                                {product.image && product.image.map((thumbnail, index) => (
                                    <img
                                        key={index}
                                        src={thumbnail}
                                        alt={`${product.title} thumbnail ${index + 1}`}
                                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80"
                                        onClick={() => handleThumbnailClick(thumbnail)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                                <p className="text-gray-600 text-xl mb-2">
                                    ₹{product.salePrice}{' '}
                                    <span className="line-through text-red-500">
                                        ₹{product.price}
                                    </span>
                                </p>
                                <p className="text-gray-700 mb-4">{product.description}</p>

                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => handleSizeClick(e.target.value)}
                                        className="border rounded-lg p-2"
                                    >
                                        <option value="" disabled>
                                            Select a size
                                        </option>
                                        {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>

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
                            <div className="mt-6">
                                <button onClick={addToCart} className="bg-blue-600 text-white py-2 px-4 rounded-lg mr-4">
                                    Add to Cart
                                </button>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {message && <p className="text-green-600 text-lg mt-4">{message}</p>}

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Product Description</h2>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                       <span className='text-xl font-semibold mb-2 mt-4 pr-2'>Average Rating-</span><span className='text-xl font-semibold'>{product.averageReview}⭐</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;




