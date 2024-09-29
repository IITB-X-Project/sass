import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

// Mock Data for Appliances
const products = [
    {
        id: 1,
        name: "Refrigerator",
        price: 25999,
        description: "Energy-efficient refrigerator with spacious interior.",
        image: "https://www.jiomart.com/images/product/original/493715146/haier-175-litres-2-star-direct-cool-single-door-refrigerator-hed-182me-n-marine-erica-stabilizer-free-operation-digital-o493715146-p600010097-2-202303302036.jpeg?im=Resize=(420,420)",
        thumbnails: [
            "https://www.jiomart.com/images/product/original/493715146/haier-175-litres-2-star-direct-cool-single-door-refrigerator-hed-182me-n-marine-erica-stabilizer-free-operation-digital-o493715146-p600010097-2-202303302036.jpeg?im=Resize=(420,420)",
            "https://www.jiomart.com/images/product/original/492573251/bpl-95-litre-1-star-single-door-refrigerator-compact-refrigerator-black-brc-1100bpmr-digital-o492573251-p594019491-2-202209240951.jpeg?im=Resize=(1000,1000)",
            "https://1.imimg.com/data/5/5/MY-1641436/GL211NM4_500x500.jpg",
        ]
    },
    {
        id: 2,
        name: "Washing Machine",
        price: 15999,
        description: "High-capacity washing machine with multiple wash modes.",
        image: "https://whirlpoolindia.vtexassets.com/arquivos/ids/164386/Xpert-care-Silver-lid-open-O3-6.5kg_1500x1500.jpg?v=638000290210600000",
        thumbnails: [
            "https://whirlpoolindia.vtexassets.com/arquivos/ids/164386/Xpert-care-Silver-lid-open-O3-6.5kg_1500x1500.jpg?v=638000290210600000",
            "https://whirlpoolindia.vtexassets.com/arquivos/ids/167803-800-auto?v=638379748757530000&width=800&height=auto&aspect=true",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybeLR29N-5rFUZ_6bgkqx9R-El_GO59WJu_8K3ZEY7ooEi95Sj6aUrNc2vo9iiZ54nFk&usqp=CAU",
        ]
    },
];

const ApplianceDetail = () => {
    const { id } = useParams();
    const product = products.find((item) => item.id === parseInt(id));

    const [cart, setCart] = useState([]);
    const [currentImage, setCurrentImage] = useState(product?.image || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
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
                                        alt={`Thumbnail ${index + 1}`} 
                                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80"
                                        onClick={() => handleThumbnailClick(thumbnail)} 
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                                {/* Price Display */}
                                <div className="relative">
                                    <p className="text-lg mb-2">
                                        <span className="line-through text-red-600 mr-2">₹{(product.price * 1.15).toFixed(2)}</span>
                                        <span className="font-semibold text-2xl">₹{product.price}</span>
                                    </p>
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
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        <option value="Extra Large">Extra Large</option>
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
                            This is where you can include detailed information about the appliance, including features, specifications, and care instructions.
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

export default ApplianceDetail;
