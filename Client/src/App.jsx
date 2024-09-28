import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext"; // Import CartProvider
import DashBoard from "./pages/dashboard";
import Electronics from "./pages/Electronics"; 
import ProductDetail from "./components/ProductDetail";
import CartPage from "./pages/CartPage"; // Ensure you have this component created
import Fashion from "./pages/fashion";
import FashionDetail from "./components/FashionDetail";
import HomeFurniture from "./pages/homeFurniture";
import Appliances from "./pages/Appliciances";
import Groceries from "./pages/groceries";
import Mobiles from "./pages/mobiles";
import MobileDetail from "./components/MobileDetail";
import ApplianceDetail from "./components/ApplianceDetail";
import GroceryDetail from "./components/GroceryDetail";
import HomeFurnitureDetail from "./components/HomeFurnitureDetail";


import FilterSidebar from "./components/FilterSidebar";
import Header from "./components/Header";



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
          <Route path="/fashions/:id" element={<FashionDetail/>}/>
          <Route path="/appliances/:id" element={<ApplianceDetail/>}/>
          <Route path="/homefurniture/:id" element={<HomeFurnitureDetail/>}/>
          <Route path="/groceries/:id" element={<GroceryDetail/>}/>
          <Route path="/mobiles/:id" element={<MobileDetail/>}/>
          <Route path="/mobiles/:id" element={<MobileDetail/>}/>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/home-furniture" element={<HomeFurniture/>} />

          <Route path="/products" element={<FilterSidebar />} />
          
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
