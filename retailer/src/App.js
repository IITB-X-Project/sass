import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CheckoutPage from './CheckOutPage/CheckOutPage.js';
import ShoppingCartPage from './ShoppingCart/ShoppingCartPage.js';

function App() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleQuantityChange = (productId, amount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.totalStock >= amount
          ? { ...product, quantity: product.quantity + amount }
          : product
      )
    );
  };

  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const totalPrice = products.reduce((total, product) => {
    if (product.isAvailable) {
      return total + product.salePrice * product.quantity;
    }
    return total;
  }, 0);

  const discount = products.reduce((discount, product) => {
    return discount + product.salePrice * product.quantity * product.discount;
  }, 0);

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ShoppingCartPage
                products={products}
                handleQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
                totalPrice={totalPrice}
                discount={discount}
              />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage totalPrice={totalPrice} discount={discount} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
