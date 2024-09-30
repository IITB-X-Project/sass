import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplianceDetail from "./components/ApplianceDetail";
import FashionDetail from "./components/FashionDetail";
import FilterSidebar from "./components/FilterSidebar";
import GroceryDetail from "./components/GroceryDetail";
import HomeFurnitureDetail from "./components/HomeFurnitureDetail";
import MobileDetail from "./components/MobileDetail";
import ProductDetail from "./components/ProductDetail";
import { CartProvider } from "./contexts/CartContext"; // Import CartProvider
import Appliances from "./pages/Appliciances";
import CheckoutPage from "./pages/CheckOutPage/CheckOutPage";
import DashBoard from "./pages/dashboard";
import Electronics from "./pages/Electronics";
import Fashion from "./pages/fashion";
import Groceries from "./pages/groceries";
import HomeFurniture from "./pages/homeFurniture";
import Mobiles from "./pages/mobiles";
import SearchResults from "./pages/searchPage";
import ShoppingCartPage from "./pages/ShoppingCart/ShoppingCartPage";



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
    <CartProvider>
      <BrowserRouter>
     
        <Routes>
         
          <Route path="/dashboard" element={<DashBoard />} /> 
          <Route path="/mobiles" element={<Mobiles/>} /> 
          <Route path="/groceries" element={<Groceries/>} /> 
          <Route path="/appliances" element={<Appliances />} /> 
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/fashions/:id" element={<FashionDetail/>}/>
          <Route path="/appliances/:id" element={<ApplianceDetail/>}/>
          <Route path="/homefurniture/:id" element={<HomeFurnitureDetail/>}/>
          <Route path="/groceries/:id" element={<GroceryDetail/>}/>
          <Route path="/mobiles/:id" element={<MobileDetail/>}/>
          <Route path="/mobiles/:id" element={<MobileDetail/>}/>
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/home-furniture" element={<HomeFurniture/>} />
          <Route
            path="/cart"
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
          <Route path="/products" element={<FilterSidebar />} />
          <Route path="/search" element={<SearchResults />} />
          
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
