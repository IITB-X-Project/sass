import Header from "../../components/Header.jsx";
import Footer from "./Footer.jsx";
import Products from "./Products.jsx";
import './ShoppingCartPage.css';

export default function ShoppingCartPage({ products, handleQuantityChange, handleRemove, totalPrice, discount }) {
  return (
    <div className="container-fluid mt-3 shopping-cart-page">
      <div data-aos="fade-down">
        <Header />
      </div>
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
