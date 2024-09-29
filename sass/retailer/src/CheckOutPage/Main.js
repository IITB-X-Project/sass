import React from 'react';
import DeliveryDateSection from './DelieveryDateSection.js';
import './Main.css';
import Sidebar from './Sidebar.js';

export default function Main() {
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
                            <h5 className={address.isSelected ? "selected": ""}>{address.address}</h5>
                        </div>
                    ))}
                </div>
                <div className="col-md-4 sidebar-section d-flex flex-column" data-aos="fade-left">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
