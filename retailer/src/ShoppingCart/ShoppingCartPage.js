import Footer from "./Footer.js";
import Navbar from "./Navbar.js";
import Products from "./Products.js";
import './ShoppingCartPage.css';

export default function ShoppingCartPage({ products, handleQuantityChange, handleRemove, totalPrice, discount }) {
  return (
    <div className="container-fluid mt-3 shopping-cart-page">
      <Navbar />
      <div className="row mt-5" data-aos="fade-up">
        <div className="col-md-12">
          <Products
            products={products}
            handleQuantityChange={handleQuantityChange}
            handleRemove={handleRemove}
            totalPrice={totalPrice}
            discount={discount}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
