import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from './Product.jsx'; // Assuming this is your product component
import './ShoppingCartPage.css';
import SideBar from './SideBar.jsx'; // Ensure this import is added

//This will work when the userId is stored in session or when login functionality is added
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/carts/cart/:userId');
        setProducts(response.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, amount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, quantity: product.quantity + amount } : product
      )
    );

    try {
      await axios.put('http://localhost:3000/api/carts/cart/:userId', { items: products });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemove = async (productId) => {
    const updatedProducts = products.filter((product) => product.productId !== productId);
    setProducts(updatedProducts);

    try {
      await axios.put('http://localhost:3000/api/carts/cart/:userId', { items: updatedProducts });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-8 col-md-7 col-sm-12">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-12 mb-3" key={product.productId} data-aos="fade-up">
              <Product
                product={product}
                id={product.productId}
                onQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-4 col-md-5 col-sm-12 d-flex flex-grow-1" data-aos="fade-left">
        <SideBar discount={0} />
      </div>
    </div>
  );
}
