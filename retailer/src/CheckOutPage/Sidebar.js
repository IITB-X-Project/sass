import React from 'react';

export default function Sidebar() {
    const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  let totalPrice = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].isAvailable) {
      totalPrice += data[i].salePrice * data[i].quantity;
    }
  }

  const discount = data.reduce((discount, product) => {
    return discount + product.salePrice * product.quantity * product.discount;
  }, 0);


    return (
        <div className="card flex-grow-1 d-flex flex-column justify-content-between sidebar-card">
            <div className="card-header sidebar-header">
                <h4>Price Details</h4>
            </div>
            <div className="card-body d-flex flex-column sidebar-body justify-content-around">
                <p><strong>Total Price:</strong> ${totalPrice}</p>
                <p><strong>Discount:</strong> ${discount}</p>
                <p><strong>Delivery:</strong> Free</p>
                <p><strong>Charges:</strong> ${totalPrice - discount}</p>
            </div>
        </div>
    );
}
