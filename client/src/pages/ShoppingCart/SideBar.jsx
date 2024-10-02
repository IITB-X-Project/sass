import axios from 'axios';
import { useEffect, useState } from 'react';
import './ShoppingCartPage.css';

export default function SideBar({discount}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/carts/cart/:userId');
            setData(response.data.items);
          } catch (error) {
            console.error('Error fetching cart:', error);
          }
        };
        fetchCart();
      }, []);

      const totalPrice = data.reduce((total, data) => {
        if (data.isAvailable) {
          return total + data.salePrice * data.quantity;
        }
        return total;
      }, 0);

    return (
        <div className="card flex-grow-1 d-flex flex-column justify-content-between sidebar-card">
            <div className="card-header sidebar-header">
                <h4>Price Details</h4>
            </div>
            <div className="card-body d-flex flex-column sidebar-body justify-content-around">
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                <p><strong>Discount:</strong> ₹{discount}</p>
                <p><strong>Delivery:</strong> Free</p>
                <p><strong>Charges:</strong> ₹{totalPrice - discount}</p>
            </div>
        </div>
    );
}
