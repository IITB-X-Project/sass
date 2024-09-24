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
        product.id === productId
          ? { ...product, quantity: product.quantity + amount }
          : product
      )
    );
  };

  const handleRemove = (id) => {
    setProducts((prev) => {
      return prev.filter((product) => product.id !== id);
    })
  };
  
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const discountAmount = products.reduce((discount, product) => {
    return discount + product.price * product.quantity * product.discount;
  }, 0);

  return (
    <div className="row">
      <div className="col-lg-8 col-md-7 col-sm-12">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-12 mb-3" key={product.id}>
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

      <div className="col-lg-4 col-md-5 col-sm-12 d-flex flex-grow-1">
        <SideBar price={totalPrice} discount={discountAmount}/>
      </div>
    </div>
  );
}
