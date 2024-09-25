import React from 'react';
import Product from './Product.js';
import SideBar from './SideBar.js';

export default function Products() {
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
  
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].isAvailable) {
      totalPrice += products[i].salePrice * products[i].quantity;
    }
  }

  const discountAmount = products.reduce((discount, product) => {
    return discount + product.salePrice * product.quantity * product.discount;
  }, 0);

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
        <SideBar price={totalPrice} discount={discountAmount} />
      </div>
    </div>
  );
}
