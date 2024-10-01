import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilterSidebar from './components/FilterSidebar';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import OrdersSumm from './components/OdersSumm';
import RandomAccount from './components/RandomAccount';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<FilterSidebar />} />
        <Route exact path="/adminpage" element={<AdminPage/>}/>
        <Route exact path='/OrdersSumm' element={<OrdersSumm/>} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route exact path='/RandomAccount' element={<RandomAccount/>} />
      </Routes>
    </Router>
  );
};

export default App;
