import React from 'react';
import SideBar from '../ShoppingCart/SideBar.jsx';
import './CheckOutPage.css';
import DeliveryDateSection from './DelieveryDateSection.jsx';

export default function Main({ totalPrice, discount }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch('/data/checkout.json')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleClick = (id) => {
        const updatedAddresses = data.order_summary.delivery_addresses.map((address) => {
            if (address.address_id === id) {
                return { ...address, isSelected: true };
            } else if (address.address_id !== id && address.isSelected === true) {
                return { ...address, isSelected: false };
            }
            return address;
        });

        setData({
            ...data,
            order_summary: {
                ...data.order_summary,
                delivery_addresses: updatedAddresses,
            },
        });
    };

    return (
        <div className="main-container container">
            <div className="delivery-section">
                <DeliveryDateSection date={data.order_summary.delivery_date} />
            </div>
            <div className="row d-flex align-items-stretch">
                <div className="col-md-8 address-section d-flex flex-column">
                    {data.order_summary.delivery_addresses.map((address) => (
                        <div key={address.address_id} className="address-card" onClick={() => handleClick(address.address_id)}>
                            <h3 className={address.isSelected ? "selected" : ""}>{address.address}</h3>
                        </div>
                    ))}
                </div>
                <div className="col-md-4 sidebar-section d-flex flex-column" data-aos="fade-left">
                    <SideBar totalPrice={totalPrice} discount={discount} />
                </div>
            </div>
        </div>
    );
}
