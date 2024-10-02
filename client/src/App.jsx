import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilterSidebar from "./components/FilterSidebar";
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
          <Route path="/home-furniture" element={<HomeFurniture/>} />
          <Route path="/products" element={<FilterSidebar />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;