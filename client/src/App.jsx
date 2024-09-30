import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext"; // Import CartProvider
import DashBoard from "./pages/dashboard";
import Electronics from "./pages/Electronics"; 
import CartPage from "./pages/CartPage"; // Ensure you have this component created
import Fashion from "./pages/fashion";
import HomeFurniture from "./pages/homeFurniture";
import Appliances from "./pages/Appliciances";
import Groceries from "./pages/groceries";
import Mobiles from "./pages/mobiles";

import ProductDetail from "./components/ProductDetail"
import FilterSidebar from "./components/FilterSidebar";
import SearchResults from "./pages/searchPage";



function App() {
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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/home-furniture" element={<HomeFurniture/>} />
          <Route path="/products" element={<FilterSidebar />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;