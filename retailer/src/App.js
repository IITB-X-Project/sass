import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import './App.css';
import ShoppingCartPage from './ShoppingCart/ShoppingCartPage.js';

function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  return (
    <div className="App">
      <ShoppingCartPage />
    </div>
  );
}

export default App;
