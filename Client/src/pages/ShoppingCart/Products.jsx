import Product from './Product.jsx';
import './ShoppingCartPage.css';
import SideBar from './SideBar.jsx'; // Ensure this import is added

export default function Products({ products, handleQuantityChange, handleRemove, totalPrice, discount }) {
  return (
    <div className="row">
      <div className="col-lg-8 col-md-7 col-sm-12">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-12 mb-3" key={product.id} data-aos="fade-up">
              <Product
                product={product}
                id={product.id}
                onQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-4 col-md-5 col-sm-12 d-flex flex-grow-1" data-aos="fade-left">
        <SideBar totalPrice={totalPrice} discount={discount} />
      </div>
    </div>
  );
}
